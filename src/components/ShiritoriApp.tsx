"use client";
import { getLastWord, isHiragana } from "@/utils/words";
import React, { useState } from "react";

type AnswerItem = {
  id: number;
  word: string;
  player: string;
};

export const ShiritoriApp = () => {
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<AnswerItem[]>([]);

  const handleOnSubmit = async () => {
    //入力値チェック
    if (!currentAnswer) {
      alert("回答を入力してください。");
      return;
    }

    if (!isHiragana(currentAnswer)) {
      alert("ひらがなで入力してください。");
      return;
    }

    if (answers.length > 0) {
      const firstWord = currentAnswer.slice(0, 1);
      let lastLastWord = getLastWord(answers[0].word);
      if (firstWord !== lastLastWord) {
        alert("「" + lastLastWord + "」で始まる言葉で回答してください。");
        return;
      }

      for (const item of answers) {
        if (currentAnswer === item.word) {
          alert("すでに回答済みの言葉です。");
          return;
        }
      }
    }

    if (currentAnswer.slice(-1) === "ん") {
      alert("あなたの負けです。最後の文字が「ん」です。");
      return;
    }

    //入力した回答を保存
    let lastId: number = answers.length;
    lastId += 1;
    const lastAnswer: AnswerItem = {
      id: lastId,
      word: currentAnswer,
      player: "あなた",
    };
    setAnswers([lastAnswer, ...answers]);

    //入力欄をクリア
    setCurrentAnswer("");

    //回答済みリストから「入力した回答の最後の文字で始まる回答」を抽出
    let alreadyAnswers: string[] = [];
    let lastWord: string = getLastWord(currentAnswer);
    for (const item of answers) {
      if (item.word.slice(0, 1) === lastWord) {
        alreadyAnswers.push(item.word);
      }
    }

    try {
      //APIを叩く
      let request: GameRequest = {
        current_answer: currentAnswer,
        already_answers: alreadyAnswers,
      };
      const response = await fetch("/api/game/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      console.log(response);

      if (!response) {
        alert("APIの応答が不正です。(レスポンス無し)");
        return;
      }

      const data: GameResponse = await response.json();
      console.log(data);

      if (!data) {
        alert("APIの応答が不正です。(ボディ無し)");
        return;
      }

      if (!data.result) {
        alert("CPUの負けです。");
        return;
      }

      //APIが応答した回答を保存
      lastId += 1;
      const newAnswer: AnswerItem = {
        id: lastId,
        word: data.next_answer,
        player: "CPU",
      };
      setAnswers([newAnswer, lastAnswer, ...answers]);
    } catch (error) {
      console.log("error! " + error);
      alert("API実行でエラーが発生しました");
    }
  };

  return (
    <div className="bg-white py-5 sm:py-5 lg:py-5">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* text - start */}
        <div className="mb-10 md:mb-5">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            しりとりゲーム
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            回答をひらがなで入力して[回答する] ボタンを押してください。
          </p>
        </div>
        {/* text - end */}

        {/* form - start */}
        <form
          className="mx-auto grid max-w-screen-md gap-4 "
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
        >
          <div>
            <label
              htmlFor="answer_word"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              回答
            </label>
            <input
              type="text"
              name="answer_word"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="flex items-center justify-between">
            <input
              type="submit"
              value="回答する"
              onSubmit={handleOnSubmit}
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            />
          </div>
        </form>
        {/* form - end */}

        {/* 過去の回答 - start */}
        <p className="mb-2 inline-block text-sm text-gray-800 sm:text-base mt-5">
          ---- 回答済みリスト ----
        </p>
        <ul className="text-gray-500 md:text-lg">
          {answers.map((item) => {
            return (
              <li key={item.id}>
                {item.word}（{item.player}）
              </li>
            );
          })}
        </ul>
        {/* 過去の回答 - end */}
      </div>
    </div>
  );
};
