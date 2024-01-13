"use client";

import { ShiritoriApp } from "@/components/ShiritoriApp";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ShiritoriApp />
    </main>
  );
}
