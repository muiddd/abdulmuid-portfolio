"use client";

import React from "react";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Projects } from "@/components/home/Projects";
import { Experience } from "@/components/home/Experience";
import { Certificates } from "@/components/home/Certificates";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Certificates />
    </div>
  );
}
