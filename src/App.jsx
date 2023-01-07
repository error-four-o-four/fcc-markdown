import Card from './components/Card';

function App() {
  const content = [
    {
      title: 'Hello!',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nam doloribus fuga fugit sapiente architecto, ducimus, quis itaque omnis at voluptates ratione id, ipsum ad possimus quae nobis voluptatem eaque.',
    },
    {
      title: 'Ola!',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ad possimus quae nobis voluptatem eaque.',
    },
    {
      title: 'Salut!',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nam doloribus fuga fugit sapiente architecto, ducimus, quis itaque omnis.',
    },
  ];

  return (
    <div className="App">
      {content.map(({ title, descr }) => (
        <Card key={title} title={title} descr={descr} />
      ))}
    </div>
  );
}

export default App;
