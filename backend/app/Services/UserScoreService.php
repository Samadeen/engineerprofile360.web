<?php

namespace App\Services;

use App\Models\UserScore;
use Illuminate\Http\JsonResponse;

class UserScoreService
{
    public static function addUserScore(array $request): JsonResponse
    {
        if (!self::categoryMatchesScores($request)) return sendResponse(true, 422, "The passed questions doesn't match the categories supplied", null);
        $userScore = UserScore::create(self::prepareRequest($request));
        return sendResponse(false, 200, "User score was added successfully!", $userScore);
    }

    public static function prepareRequest(array $request): array
    {
        $request['categories'] = json_encode($request['categories']);
        $request['passed_questions'] = json_encode($request['passed_questions']);
        return  $request;
    }

    public static function categoryMatchesScores(array $request): int
    {
        return count($request['categories']) === count($request['passed_questions']) ? 1 : 0;
    }

    public static function getUserScore($request): JsonResponse
    {
        $userScore = UserScore::where(["employee_id" => $request->employee_id, "assessment_id" => $request->ass_id]);
        if (!$userScore->exists()) return sendResponse(true, 404, "User Score not found", null);
        return sendResponse(false, 200, "Successful", $userScore->get());
    }
}