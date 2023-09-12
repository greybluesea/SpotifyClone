import getSongsByKeywordInTitle from "@/actions/getSongsByKeywordInTitle";
import PageContent from "@/components/PageContent";
import SearchInput from "@/components/SearchInput";

import React from "react";

type SearchPageProps = { searchParams: { keyword: string } };

export const revalidate = 0;

const SearchPage = async ({ searchParams: { keyword } }: SearchPageProps) => {
  const songs = await getSongsByKeywordInTitle(keyword);
  return (
    <main className="px-6 pt-0.5 pb-4 space-y-6">
      <SearchInput />

      <PageContent songs={songs} />
    </main>
  );
};

export default SearchPage;
