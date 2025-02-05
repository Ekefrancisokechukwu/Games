import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { motion } from "motion/react";
import Sound from "components/Sound";
import { useState } from "react";
import PlayScreen from "~/welcome/PlayScreen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [getStarted, setGetStarted] = useState(false);

  return (
    <div>
      {getStarted ? (
        <PlayScreen />
      ) : (
        <Welcome handleGetStarted={() => setGetStarted(true)} />
      )}

      <Sound />
    </div>
  );
}
