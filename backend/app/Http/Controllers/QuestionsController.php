<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Exception;
use Illuminate\Http\Request;
use App\Http\Requests\CreateQuestionRequest;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class QuestionsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function addManually(CreateQuestionRequest $request): JsonResponse
    {
        $data = $request->all();
        try {
            Question::create($data);
            return $this->successResponse(true, 'Question created', Response::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->errorResponse('Question not created', $e->getMessage());
        }
    }


    public function updateQuestion(CreateQuestionRequest $request, $question_id)
    {
        try {
            $updatedData = $request->all();

            // Get question by id
            $question = Question::find($question_id);

            if (!$question) {
                return $this->errorResponse(
                    'Question does not exist',
                    'Question not found',
                    Response::HTTP_NOT_FOUND
                );
            }
            $question->update($updatedData);

            // success response
            return $this->successResponse(true, 'Question updated successfully', Response::HTTP_OK);
        } catch (Exception $e) {
            return $this->errorResponse('Question not fetched', $e->getMessage());
        }
    }

<<<<<<< HEAD
    public function getQuestByOrgId($org_id){
        try {
            $question = Question::where('org_id', $org_id)->get();
            if(is_null($question)) {
                return $this->errorResponse('No questions exist for this company', Response::HTTP_NOT_FOUND);
            }
            return $this->successResponse(true, 'OK', $question, 201);
        } catch (Exception $e) {
            return $this->errorResponse('Questions not fetched', $e->getMessage());
        }     
    }
}
=======
    public function getByCategoryId(string $id): JsonResponse
    {
        $question = Question::where(["category_id" => $id])->first();
        if (!$question) return $this->errorResponse("Question not found", true, Response::HTTP_NOT_FOUND);
        return $this->successResponse(true, "Successful", $question, Response::HTTP_OK);
    }
}
>>>>>>> 1025b7bc35fd10a40d34aeb570c3784bb37e6352
