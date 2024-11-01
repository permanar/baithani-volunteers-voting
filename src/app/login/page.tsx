"use client";

import React from "react";
import Link from "next/link";

import { ApiClient } from "@/common/api";

const LoginPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");

    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const json = await res.json();

    console.log(json);
  };

  return (
    <div>
      <center>
        <Link href="/">Home</Link>
      </center>
      LoginPage
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>

        <button type="submit">Submit</button>
      </form>
      <button
        onClick={async () => {
          const data = ApiClient("/api/v1/auth/me");

          console.log({ data });
        }}
      >
        fetch me
      </button>
      <button
        onClick={async () => {
          await fetch("/api/v1/auth/logout", {
            method: "POST",
          });
        }}
      >
        logout
      </button>
    </div>
  );
};

export default LoginPage;
