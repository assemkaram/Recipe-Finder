import { useState, useEffect } from "react";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const url = query.trim()
      ? `https://dummyjson.com/recipes/search?q=${encodeURIComponent(query.trim())}`
      : "https://dummyjson.com/recipes?limit=12";

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => setRecipes(data.recipes ?? []))
      .catch((err) => {
        if (err.name !== "AbortError") setError("Loading Error");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.search.value);
  };

  return (
    <div className="min-h-screen bg-[#fff8f0] font-[Lato,sans-serif] text-[#1f2937] leading-normal">
      
      <main className="mx-auto max-w-[1260px] px-4 pb-16 pt-8">
        <form
          onSubmit={handleSubmit}
          role="search"
          className="mx-auto mb-6 flex max-w-[640px] flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="search" className="sr-only">
            Search recipes
          </label>
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Search recipes, e.g. pizza"
            className="flex-1 rounded-full border border-[#e5e7eb] bg-white px-5 py-3 focus:outline-2 focus:outline-[#e8590c] focus:border-transparent"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full border-2 border-[#e8590c] bg-[#e8590c] px-6 py-2.5 font-bold text-white hover:border-[#c2410c] hover:bg-[#c2410c]"
          >
            Search
          </button>
        </form>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e5e7eb] border-t-[#e8590c]" />
          </div>
        )}

        {!loading && error && (
          <section
            role="alert"
            className="mx-auto mb-6 flex max-w-[420px] flex-col items-center gap-2 rounded-2xl bg-red-50 px-4 py-8 text-center text-red-700"
          >
            <h2 className="text-xl font-bold">Oops!</h2>
            <p>Something went wrong</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-2 cursor-pointer rounded-full border-2 border-[#e8590c] bg-[#e8590c] px-6 py-2.5 font-bold text-white hover:border-[#c2410c] hover:bg-[#c2410c]"
            >
              Try again
            </button>
          </section>
        )}

        {!loading && !error && (
          <>
            {recipes.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                <p className="text-5xl">🔍</p>
                <h2 className="text-xl font-bold">No recipes found</h2>
                <p className="text-[#6b7280]">Try a different search term.</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-[#6b7280]">
                  {recipes.length} recipes found
                </p>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {recipes.map((recipe) => (
                    <li key={recipe.id}>
                      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-xl">
                        <div className="relative aspect-[4/3]">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="block h-full w-full object-cover"
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-[#e8590c] px-3 py-0.5 text-xs font-bold text-white">
                            {recipe.cuisine}
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col gap-2 p-4">
                          <h2 className="line-clamp-1 text-lg font-bold">
                            {recipe.name}
                          </h2>

                          <p className="flex justify-between text-sm text-[#6b7280]">
                            <span>
                              ⏱{" "}
                              {recipe.prepTimeMinutes + recipe.cookTimeMinutes}{" "}
                              min
                            </span>
                            <span>🔥 {recipe.caloriesPerServing} kcal</span>
                          </p>

                          <p className="flex justify-between text-sm text-[#6b7280]">
                            <span>
                              ⭐ {recipe.rating.toFixed(1)} (
                              {recipe.reviewCount})
                            </span>
                            <span>{recipe.difficulty}</span>
                          </p>

                          <button
                            type="button"
                            className="mt-auto w-full cursor-pointer rounded-full border-2 border-[#e8590c] bg-transparent px-6 py-2.5 font-bold text-[#e8590c] hover:bg-[#e8590c] hover:text-white"
                          >
                            View recipe
                          </button>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
