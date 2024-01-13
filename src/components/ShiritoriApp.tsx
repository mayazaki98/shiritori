"use client";

import { getAllAnswers } from "@/utils/supabaseFunction";
import React, { useEffect, useState } from "react";

export const ShiritoriApp = () => {
  const [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    const getAnswers = async () => {
      const answers = await getAllAnswers();
      setAnswers(answers);
      console.log(answers);
    };
    getAnswers();
  }, []);

  return (
    <section className="text-center mb-2 text-2xl font-medium">
      <h3>しりとりゲーム</h3>
    </section>
  );
};
