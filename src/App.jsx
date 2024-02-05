import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./components/home.jsx";
import DndLibrary from "./components/dndLibrary.jsx";
import NativeDnd from "./components/nativeDnd.jsx";
import DndActivity from "./components/DndActivity.jsx";
import NativeActivity from "./components/NativeActivity.jsx";

function App() {


  return (
    <div className={'app'}>
      <Routes>
          <Route path={'/'} element={ <Home /> } />
          <Route path={'/dnd'} element={ <DndLibrary /> } />
          <Route path={'/native'} element={ <NativeDnd /> }/>
          <Route path={'/dnd/activity-sample'} element={ <DndActivity /> } />
          <Route path={'/native/activity-sample'} element={ <NativeActivity /> } />
      </Routes>
    </div>
  )
}

export default App
