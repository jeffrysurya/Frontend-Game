import React from "react";
import { createRoot } from 'react-dom/client';
import { Button, Container, Player } from "../VideoHandling/VideoHandling";

test("Test Button", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<Button></Button>);
})

test("Test Container", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<Container></Container>);
})

test("Test Player", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<Player></Player>);
})

test("Test Link", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<Link></Link>);
})

test("Test Form", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<Form></Form>);
})


