"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();

	// 初期値を設定
	useEffect(() => {
		const initialSearch = searchParams.get("search") || "";
		setSearch(initialSearch);
		setDebouncedSearch(initialSearch);
	}, [searchParams]);

	//デバウンス
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
		}, 500);
		return () => clearTimeout(timer);
	}, [search]);

	// debounceSearchが更新されたら実行
	useEffect(() => {
		if (debouncedSearch.trim()) {
			router.push(`/?search=${encodeURIComponent(debouncedSearch.trim())}`);
		} else {
			router.push("/");
		}
	}, [debouncedSearch, router]);

	return (
		<>
			<Input
				placeholder="記事を検索..."
				className="w-[200px] lg:w-[300px] bg-white "
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</>
	);
}
