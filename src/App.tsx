export const App = () => {
  const ideas = [
    { id: 1, title: "Idea 1", description: "Description" },
    { id: 2, title: "Idea 2", description: "Description" },
    { id: 3, title: "Idea 3", description: "Description" },
  ];
  return (
    <div>
      <h1>IdeaNick</h1>
      <div className="ideas">
        {ideas.map((idea) => (
          <div key={idea.id}>
            <h2>{idea.title}</h2>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
