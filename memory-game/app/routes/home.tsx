import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useState } from "react";
import PlayScreen from "~/welcome/PlayScreen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Memory" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [getStarted, setGetStarted] = useState(false);

  return (
    <div>
      {getStarted ? (
        <PlayScreen quit={() => setGetStarted(false)} />
      ) : (
        <Welcome handleGetStarted={() => setGetStarted(true)} />
      )}
    </div>
  );
}
