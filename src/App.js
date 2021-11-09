import { Switch, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import StudentForm from "./pages/StudentForm";
import StudentsList from "./pages/StudentsList";
import CreateStudent from "./pages/CreateStudent";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <StudentsList />
        </Route>
        <Route path="/create">
          <CreateStudent />
        </Route>
        <Route path="/:id">
          <StudentForm />
        </Route>

        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
