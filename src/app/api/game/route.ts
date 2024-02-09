import { getNextAnswer } from '@/utils/supabaseFunction';
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async(req: NextRequest) => {
  const requestBody: GameRequest = await req.json();
  let responseBody: GameResponse = {result: false, next_answer : ""};

  console.log('url=[%s] method=[%s] request=[%s]', req.url, req.method, JSON.stringify(requestBody));

  //次の回答を取得
  try {
    responseBody.next_answer = await getNextAnswer(requestBody.current_answer, requestBody.already_answers);
    console.log('getNextAnswer next_answer_word=[%s]', responseBody.next_answer);
  } catch(err) {
    console.log('getNextAnswer failed! err=[%s]:' + JSON.stringify(err));
  }
  
  if (responseBody.next_answer) {
    responseBody.result = true;
  }
  
  return NextResponse.json(responseBody, {status: 200});
}