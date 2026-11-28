import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/recipes/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setRecipe(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError("ما لقيناش الوصفة دي");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  const stats = recipe
    ? [
        { label: "Prep", value: `${recipe.prepTimeMinutes} min` },
        { label: "Cook", value: `${recipe.cookTimeMinutes} min` },
        { label: "Servings", value: recipe.servings },
        { label: "Calories", value: recipe.caloriesPerServing },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#fff8f0] text-[#1f2937]">
      <main className="mx-auto max-w-[1260px] px-4 pb-16 pt-8">
        <Link
          to="/"
          className="mb-5 inline-block font-bold text-[#e8590c] hover:underline"
        >
          ← Back to recipes
        </Link>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e5e7eb] border-t-[#e8590c]" />
          </div>
        )}

        {!loading && error && (
          <p className="mx-auto max-w-[420px] rounded-2xl bg-red-50 p-4 text-center text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && recipe && (
          <article className="mx-auto max-w-[800px]">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="max-h-96 w-full rounded-2xl object-cover"
            />

            <h1 className="my-5 text-3xl font-black sm:text-4xl">
              {recipe.name}
            </h1>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#e8590c] px-3 py-1 text-xs font-bold text-white">
                {recipe.cuisine}
              </span>
              <span className="rounded-full bg-[#ffedd5] px-3 py-1 text-xs font-bold text-[#c2410c]">
                {recipe.difficulty}
              </span>
              {recipe.mealType?.map((meal) => (
                <span
                  key={meal}
                  className="rounded-full bg-[#ffedd5] px-3 py-1 text-xs font-bold text-[#c2410c]"
                >
                  {meal}
                </span>
              ))}
            </div>

            <dl className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-white p-3 text-center"
                >
                  <dt className="text-xs uppercase text-[#6b7280]">
                    {item.label}
                  </dt>
                  <dd className="text-lg font-bold">{item.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mb-3 mt-6 text-2xl font-bold">Ingredients</h2>
            <ul className="list-disc space-y-2 pl-5">
              {recipe.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mb-3 mt-6 text-2xl font-bold">Instructions</h2>
            <ol className="list-decimal space-y-2 pl-5">
              {recipe.instructions.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        )}
      </main>
    </div>
  );
}
