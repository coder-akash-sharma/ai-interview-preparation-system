from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
import os
import json
import time


# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

model_name = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.8-flash"
)


# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI(
    title="AI Interview Preparation Service"
)


# ==========================================
# REQUEST MODELS
# ==========================================

class ResumeRequest(BaseModel):
    resume_text: str


class InterviewQuestionsRequest(BaseModel):
    resume_text: str
    number_of_questions: int = 5


# ==========================================
# HOME ROUTE
# ==========================================

@app.get("/")
def home():
    return {
        "message": "AI Interview Preparation AI Service is running 🚀"
    }


# ==========================================
# RESUME ANALYSIS / ATS
# ==========================================

@app.post("/analyze")
def analyze_resume(data: ResumeRequest):

    # --------------------------------------
    # Check API key
    # --------------------------------------

    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY is not configured."
        )

    # --------------------------------------
    # Get resume text
    # --------------------------------------

    resume_text = data.resume_text.strip()

    if not resume_text:
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )

    # --------------------------------------
    # Resume analysis prompt
    # --------------------------------------

    prompt = f"""
You are an expert resume reviewer and ATS specialist.

Analyze the following resume carefully.

Return ONLY valid JSON.

The JSON must contain exactly these fields:

{{
    "resume_score": 0,
    "ats_score": 0,
    "strengths": [],
    "mistakes": [],
    "improvements": [],
    "missing_keywords": [],
    "suggestions": []
}}

Rules:

1. resume_score must be between 0 and 100.
2. ats_score must be between 0 and 100.
3. strengths should contain 3 to 5 useful points.
4. mistakes should contain 3 to 5 actual problems.
5. improvements should contain 3 to 5 actionable improvements.
6. missing_keywords should contain relevant technical or professional keywords.
7. suggestions should contain useful suggestions for projects, experience,
   skills, achievements, or resume content.
8. Do not invent experience that is not present in the resume.
9. Give practical advice for a college student looking for internships
   or entry-level software jobs.
10. Keep the analysis concise and practical.

Resume:
-------------------------
{resume_text}
-------------------------
"""

    # ======================================
    # CREATE GEMINI CLIENT
    # ======================================

    client = genai.Client(
        api_key=api_key
    )

    # ======================================
    # RETRY SETTINGS
    # ======================================

    max_retries = 3

    # ======================================
    # GEMINI REQUEST
    # ======================================

    for attempt in range(max_retries):

        try:

            print("================================")
            print(
                f"Resume analysis attempt "
                f"{attempt + 1}/{max_retries}"
            )
            print(
                f"MODEL USED: {model_name}"
            )
            print("================================")

            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )

            result_text = response.text.strip()

            # ----------------------------------
            # Remove markdown code fences
            # ----------------------------------

            if result_text.startswith("```"):

                result_text = (
                    result_text
                    .replace("```json", "")
                    .replace("```", "")
                    .strip()
                )

            # ----------------------------------
            # Convert JSON
            # ----------------------------------

            result = json.loads(result_text)

            # ----------------------------------
            # Validate fields
            # ----------------------------------

            required_fields = [
                "resume_score",
                "ats_score",
                "strengths",
                "mistakes",
                "improvements",
                "missing_keywords",
                "suggestions"
            ]

            for field in required_fields:

                if field not in result:
                    raise ValueError(
                        f"Missing field in Gemini response: {field}"
                    )

            # ----------------------------------
            # Validate scores
            # ----------------------------------

            if not isinstance(
                result["resume_score"],
                (int, float)
            ):
                raise ValueError(
                    "resume_score must be a number."
                )

            if not isinstance(
                result["ats_score"],
                (int, float)
            ):
                raise ValueError(
                    "ats_score must be a number."
                )

            if not 0 <= result["resume_score"] <= 100:
                raise ValueError(
                    "resume_score must be between 0 and 100."
                )

            if not 0 <= result["ats_score"] <= 100:
                raise ValueError(
                    "ats_score must be between 0 and 100."
                )

            print("Resume analysis successful ✅")
            print(
                f"Resume Score: {result['resume_score']}"
            )
            print(
                f"ATS Score: {result['ats_score']}"
            )
            print("================================")

            return result

        # --------------------------------------
        # JSON ERROR
        # --------------------------------------

        except json.JSONDecodeError as error:

            print("================================")
            print("RESUME JSON ERROR")
            print("ERROR:", repr(error))
            print(
                "RESPONSE:",
                result_text if "resulndt_text" in locals()
                else "No response"
            )
            print("================================")

            raise HTTPException(
                status_code=500,
                detail="Gemini returned invalid JSON."
            )

        # --------------------------------------
        # OTHER ERRORS
        # --------------------------------------

        except Exception as error:

            error_text = str(error)

            print("================================")
            print(
                "GEMINI ERROR TYPE:",
                type(error).__name__
            )
            print(
                "GEMINI ERROR:",
                repr(error)
            )
            print(
                "GEMINI ERROR STRING:",
                error_text
            )
            print(
                "MODEL USED:",
                model_name
            )
            print("================================")

            is_temporary_error = (
                "503" in error_text
                or "UNAVAILABLE" in error_text
                or "high demand" in error_text.lower()
                or "temporarily" in error_text.lower()
            )

            if (
                is_temporary_error
                and attempt < max_retries - 1
            ):

                wait_time = 2 ** attempt

                print(
                    f"Gemini temporarily unavailable."
                )

                print(
                    f"Retrying in {wait_time} seconds..."
                )

                time.sleep(wait_time)

                continue

            raise HTTPException(
                status_code=502,
                detail=(
                    "Gemini AI service is currently "
                    "unavailable. Please try again later. "
                    f"Error: {error_text}"
                )
            )


# ==========================================
# GENERATE INTERVIEW QUESTIONS
# ==========================================

@app.post("/generate-questions")
def generate_questions(
    data: InterviewQuestionsRequest
):

    # --------------------------------------
    # Check API key
    # --------------------------------------

    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY is not configured."
        )

    # --------------------------------------
    # Get resume text
    # --------------------------------------

    resume_text = data.resume_text.strip()

    if not resume_text:
        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )

    # --------------------------------------
    # Validate number of questions
    # --------------------------------------

    if data.number_of_questions < 1:
        raise HTTPException(
            status_code=400,
            detail="Number of questions must be at least 1."
        )

    if data.number_of_questions > 20:
        raise HTTPException(
            status_code=400,
            detail="Maximum 20 questions are allowed."
        )

    # --------------------------------------
    # Interview question prompt
    # --------------------------------------

    prompt = f"""
You are an expert technical interviewer.

Analyze the candidate's resume and generate
exactly {data.number_of_questions} interview questions.

The questions must be based ONLY on information
present in the resume.

Generate a balanced mixture of:

1. Technical questions
2. Project-based questions
3. HR/general questions

Each question must contain:

- question
- type
- difficulty

Allowed types:

"Technical"
"Project"
"HR"

Allowed difficulty levels:

"Easy"
"Medium"
"Hard"

Important rules:

1. Do not invent technologies that are not present
   in the resume.

2. Ask project questions about projects actually
   mentioned in the resume.

3. Ask technical questions related to the candidate's
   listed skills.

4. Ask realistic questions that an interviewer could
   actually ask.

5. Keep questions suitable for a college student
   applying for internships or entry-level jobs.

6. Include a mixture of Easy, Medium and Hard
   questions when appropriate.

7. Do not ask all questions about the same project.

8. Do not repeat questions.

9. Do not invent work experience.

10. Return ONLY valid JSON.

11. Do not use markdown.

12. Do not add explanations outside the JSON.

Return exactly this JSON structure:

{{
    "questions": [
        {{
            "question": "Example question",
            "type": "Technical",
            "difficulty": "Medium"
        }}
    ]
}}

Resume:
-------------------------
{resume_text}
-------------------------
"""

    # ======================================
    # CREATE GEMINI CLIENT
    # ======================================

    client = genai.Client(
        api_key=api_key
    )

    # ======================================
    # RETRY SETTINGS
    # ======================================

    max_retries = 3

    # ======================================
    # GENERATE QUESTIONS
    # ======================================

    for attempt in range(max_retries):

        try:

            print("================================")
            print(
                f"Interview question generation "
                f"attempt {attempt + 1}/{max_retries}"
            )
            print(
                f"MODEL USED: {model_name}"
            )
            print("================================")

            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )

            result_text = response.text.strip()

            # ----------------------------------
            # Remove markdown code fences
            # ----------------------------------

            if result_text.startswith("```"):

                result_text = (
                    result_text
                    .replace("```json", "")
                    .replace("```", "")
                    .strip()
                )

            # ----------------------------------
            # Convert JSON
            # ----------------------------------

            result = json.loads(result_text)

            # ----------------------------------
            # Validate questions field
            # ----------------------------------

            if "questions" not in result:

                raise ValueError(
                    "Gemini response does not contain "
                    "'questions'."
                )

            if not isinstance(
                result["questions"],
                list
            ):

                raise ValueError(
                    "'questions' must be a list."
                )

            # ----------------------------------
            # Validate question count
            # ----------------------------------

            if len(result["questions"]) == 0:

                raise ValueError(
                    "Gemini returned no questions."
                )

            # ----------------------------------
            # Validate each question
            # ----------------------------------

            allowed_types = [
                "Technical",
                "Project",
                "HR"
            ]

            allowed_difficulties = [
                "Easy",
                "Medium",
                "Hard"
            ]

            for question in result["questions"]:

                if "question" not in question:
                    raise ValueError(
                        "Question text is missing."
                    )

                if "type" not in question:
                    raise ValueError(
                        "Question type is missing."
                    )

                if "difficulty" not in question:
                    raise ValueError(
                        "Question difficulty is missing."
                    )

                if question["type"] not in allowed_types:

                    raise ValueError(
                        "Invalid question type: "
                        f"{question['type']}"
                    )

                if (
                    question["difficulty"]
                    not in allowed_difficulties
                ):

                    raise ValueError(
                        "Invalid difficulty: "
                        f"{question['difficulty']}"
                    )

            # ----------------------------------
            # Success
            # ----------------------------------

            print(
                "Interview questions generated successfully ✅"
            )

            print(
                f"Questions generated: "
                f"{len(result['questions'])}"
            )

            print("================================")

            return result

        # ======================================
        # JSON ERROR
        # ======================================

        except json.JSONDecodeError as error:

            print("================================")
            print("QUESTION JSON ERROR")
            print("ERROR:", repr(error))
            print(
                "RESPONSE:",
                result_text if "result_text" in locals()
                else "No response"
            )
            print("================================")

            raise HTTPException(
                status_code=500,
                detail="Gemini returned invalid JSON."
            )

        # ======================================
        # OTHER ERRORS
        # ======================================

        except Exception as error:

            error_text = str(error)

            print("================================")
            print(
                "INTERVIEW GEMINI ERROR TYPE:",
                type(error).__name__
            )
            print(
                "INTERVIEW GEMINI ERROR:",
                repr(error)
            )
            print(
                "INTERVIEW GEMINI ERROR STRING:",
                error_text
            )
            print(
                "MODEL USED:",
                model_name
            )
            print("================================")

            # ----------------------------------
            # Check temporary Gemini errors
            # ----------------------------------

            is_temporary_error = (
                "503" in error_text
                or "UNAVAILABLE" in error_text
                or "high demand" in error_text.lower()
                or "temporarily" in error_text.lower()
            )

            # ----------------------------------
            # Retry
            # ----------------------------------

            if (
                is_temporary_error
                and attempt < max_retries - 1
            ):

                wait_time = 2 ** attempt

                print(
                    "Gemini temporarily unavailable."
                )

                print(
                    f"Retrying in {wait_time} seconds..."
                )

                time.sleep(wait_time)

                continue

            # ----------------------------------
            # Final failure
            # ----------------------------------

            raise HTTPException(
                status_code=502,
                detail=(
                    "Gemini AI service is currently "
                    "unavailable. Please try again later. "
                    f"Error: {error_text}"
                )
            )


# ==========================================
# AI INTERVIEW ANSWER EVALUATION
# ==========================================

from typing import List


# ==========================================
# REQUEST MODELS
# ==========================================

class InterviewAnswer(BaseModel):
    question: str
    answer: str


class InterviewEvaluationRequest(BaseModel):
    role: str
    difficulty: str
    answers: List[InterviewAnswer]


# ==========================================
# EVALUATE INTERVIEW ANSWERS
# ==========================================

@app.post("/evaluate-interview")
def evaluate_interview(data: InterviewEvaluationRequest):
    if not api_key:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY is not configured."
        )

    role = data.role.strip()
    difficulty = data.difficulty.strip()

    if not role:
        raise HTTPException(status_code=400, detail="Interview role is required.")

    if difficulty not in ["Easy", "Medium", "Hard"]:
        raise HTTPException(
            status_code=400,
            detail="Difficulty must be Easy, Medium, or Hard."
        )

    if not data.answers:
        raise HTTPException(
            status_code=400,
            detail="At least one interview answer is required."
        )

    if len(data.answers) > 20:
        raise HTTPException(
            status_code=400,
            detail="Maximum 20 answers are allowed."
        )

    submitted_answers = []
    for index, item in enumerate(data.answers, start=1):
        question = item.question.strip()
        answer = item.answer.strip()

        if not question:
            raise HTTPException(
                status_code=400,
                detail=f"Question {index} cannot be empty."
            )

        submitted_answers.append({
            "question_number": index,
            "question": question,
            "answer": answer
        })

    prompt = f"""
You are an experienced technical interviewer and evaluator.
Evaluate every candidate answer fairly and in context.

ROLE: {role}
DIFFICULTY: {difficulty}

CANDIDATE ANSWERS:
{json.dumps(submitted_answers, ensure_ascii=False)}

Evaluate each answer using correctness, relevance, completeness,
conceptual understanding, and clarity. Judge meaning rather than exact
keyword matching. Accept correct explanations written in different words.
Consider the role and difficulty. Do not reward an incorrect answer merely
because it contains technical keywords. Empty answers score 0 and are
incorrect. Do not invent facts about the candidate.

Give each answer a score from 0 to 10.
Use status "correct" for a substantially correct answer,
"partially-correct" for an answer with some correct content but important
omissions or mistakes, and "incorrect" for an incorrect or empty answer.
Feedback must explain the evaluation. Suggested answers must be accurate.
Return exactly one evaluation for every answer in the original order.

Return ONLY valid JSON with this structure:
{{
  "answers": [
    {{
      "question_number": 1,
      "score": 0,
      "status": "incorrect",
      "feedback": "Explanation of the evaluation.",
      "suggestedAnswer": "A technically accurate answer.",
      "missingConcepts": ["Important missing concept"]
    }}
  ],
  "overall_score": 0,
  "strengths": ["Strength demonstrated by the candidate"],
  "weaknesses": ["Area that needs improvement"],
  "suggestions": ["Actionable recommendation"],
  "summary": "A concise overall assessment."
}}

The overall score is the average of individual scores multiplied by 10,
rounded to the nearest integer. Every score must be numeric and in range.
Do not include markdown or explanations outside the JSON.
"""

    client = genai.Client(api_key=api_key)

    try:
        print("================================")
        print("Starting interview evaluation")
        print("Role:", role)
        print("Difficulty:", difficulty)
        print("Questions:", len(submitted_answers))
        print("Model:", model_name)
        print("================================")

        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )

        if not response.text:
            raise ValueError("Gemini returned an empty response.")

        result_text = response.text.strip()
        if result_text.startswith("```"):
            result_text = (
                result_text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        result = json.loads(result_text)

        required_fields = [
            "answers", "overall_score", "strengths",
            "weaknesses", "suggestions", "summary"
        ]
        for field in required_fields:
            if field not in result:
                raise ValueError(f"Missing evaluation field: {field}")

        evaluated_answers = result["answers"]
        if not isinstance(evaluated_answers, list):
            raise ValueError("Evaluated answers must be a list.")

        if len(evaluated_answers) != len(submitted_answers):
            raise ValueError(
                "The number of evaluated answers does not match the submission."
            )

        allowed_statuses = ["correct", "partially-correct", "incorrect"]
        for index, evaluation in enumerate(evaluated_answers):
            if not isinstance(evaluation, dict):
                raise ValueError("An answer evaluation is invalid.")

            answer_fields = [
                "question_number", "score", "status", "feedback",
                "suggestedAnswer", "missingConcepts"
            ]
            for field in answer_fields:
                if field not in evaluation:
                    raise ValueError(f"Missing answer field: {field}")

            if evaluation["question_number"] != index + 1:
                raise ValueError("Answer evaluation order is invalid.")

            score = evaluation["score"]
            if (
                isinstance(score, bool)
                or not isinstance(score, (int, float))
                or not 0 <= score <= 10
            ):
                raise ValueError("Individual scores must be between 0 and 10.")

            if evaluation["status"] not in allowed_statuses:
                raise ValueError("An answer status is invalid.")

            if not isinstance(evaluation["feedback"], str):
                raise ValueError("feedback must be text.")

            if not isinstance(evaluation["suggestedAnswer"], str):
                raise ValueError("suggestedAnswer must be text.")

            if (
                not isinstance(evaluation["missingConcepts"], list)
                or not all(isinstance(x, str) for x in evaluation["missingConcepts"])
            ):
                raise ValueError("missingConcepts must be a list of text.")

        for field in ["strengths", "weaknesses", "suggestions"]:
            if (
                not isinstance(result[field], list)
                or not all(isinstance(item, str) for item in result[field])
            ):
                raise ValueError(f"{field} must be a list of text.")

        if not isinstance(result["summary"], str):
            raise ValueError("summary must be text.")

        # Calculate overall score from the validated per-answer scores,
        # rather than trusting a potentially inconsistent model-generated value.
        overall_score = round(
            sum(item["score"] for item in evaluated_answers)
            / len(evaluated_answers)
            * 10
        )

        print("Interview evaluation successful. Score:", overall_score)
        print("================================")

        return {
            "success": True,
            "role": role,
            "difficulty": difficulty,
            "answers": evaluated_answers,
            "score": overall_score,
            "strengths": result["strengths"],
            "weaknesses": result["weaknesses"],
            "suggestions": result["suggestions"],
            "summary": result["summary"]
        }

    except HTTPException:
        raise
    except Exception as error:
        print("INTERVIEW EVALUATION FAILED")
        print(type(error).__name__, str(error))
        raise HTTPException(
            status_code=502,
            detail=(
                "AI evaluation failed. No interview score was generated. "
                "Please try again later."
            )
        )
