"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce<string>(keyword);

  useEffect(() => {
    const query = {
      keyword: debouncedKeyword,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedKeyword]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="bg-black"
      autoFocus
    />
  );
};

export default SearchInput;
