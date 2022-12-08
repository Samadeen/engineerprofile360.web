<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CSVQuestionRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "assessment_id" => 'required|string',
            "base64" => 'required|string'
        ];
    }
}