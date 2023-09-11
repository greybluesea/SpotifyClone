import getSongsByKeywordInTitle from "@/actions/getSongsByKeywordInTitle";
import PageContent from "@/components/PageContent";
import SearchInput from "@/components/SearchInput";
import React from "react";

type SearchPageProps = { searchParams: { keyword: string } };

const SearchPage = async ({ searchParams: { keyword } }: SearchPageProps) => {
  const songs = await getSongsByKeywordInTitle(keyword);
  return (
    <main className="px-6 space-y-6">
      <SearchInput />
      <PageContent songs={songs} />
    </main>
  );
};

export default SearchPage;
