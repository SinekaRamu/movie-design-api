# Movie design with api

- create a react app using vite
- install packages `npm i react-router-dom axios`

## Creating Pages

- Every project must have indexPage and NotfoundPage
- add other pages using lazy and suspense
- Typescript for layout [reference](https://stackoverflow.com/questions/64722861/what-typescript-type-should-react-children-be-set-to)

```
interface ILayout {
  title: string;
  children: React.ReactNode;
}
```

## creating single component

Form component that is reused for editPage and addPage

- In total there are four pages,
  - HomePAge
  - AddmoviePage
  - EditPage
  - NotfoundPAge
- api call using axios [api-request](https://www.freecodecamp.org/news/axios-react-how-to-make-get-post-and-delete-api-requests/)

```
another moethod
useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5476/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, []);
```

- Axios with async & await method

```
useEffect(() => {
    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesFromAPI();
  }, [refresh]);
```

### Home page

Home page has a title and list of card with movie title and release year.

- Each moviecard has two button edit and delete.
- These button calls the api PUT and DELETE function. these button emoji are taken from [here](https://emojipedia.org/)

## Model Page

- while deleting it displays the model page. This page containes the action and its message.
- also created component for form inputs
