import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import {SLogin} from "./Components/Student_components/SLogin"
import {SDashBoard} from "./Components/Student_components/SDashBoard"
import {SRegister} from "./Components/Student_components/SRegister"
import {SAttemptQuiz} from "./Components/Student_components/SAttemptQuiz"
import {SPrivateRoute} from "./Components/Student_components/SPrivateRoute"
import {SRedirectIfLoggedIn} from "./Components/Student_components/SRedirectIfLoggedIn"
import {SSeeQuizResult} from "./Components/Student_components/SSeeQuizResult"
import {SSeeQuizes} from "./Components/Student_components/SSeeQuizes"


import {TLogin } from "./Components/Teacher_componentS/TLogin"
import {TDashBoard } from "./Components/Teacher_componentS/TDashBoard"
import {TRegister } from "./Components/Teacher_componentS/TRegister"
import {TCreatetQuiz } from "./Components/Teacher_componentS/TCreatetQuiz"
import {TPrivateRoute } from "./Components/Teacher_componentS/TPrivateRoute"
import {TRedirectIfLoggedIn } from "./Components/Teacher_componentS/TRedirectIfLoggedIn"
import {TSeeQuizResult } from "./Components/Teacher_componentS/TSeeQuizResult"
import {TSeeQuizes } from "./Components/Teacher_componentS/TSeeQuizes"



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SRedirectIfLoggedIn><SLogin/></SRedirectIfLoggedIn> }></Route>
      {/* <Route path='/student-login' element={<SLogin/>}></Route> */}
      <Route path='/student-register' element={<SRedirectIfLoggedIn><SRegister/></SRedirectIfLoggedIn>}></Route>
      <Route path='/student-dashboard' element={<SPrivateRoute><SDashBoard/></SPrivateRoute>}></Route>
      <Route path='/student-attempt-quiz/:Quizz_ID' element={<SPrivateRoute><SAttemptQuiz/></SPrivateRoute>}></Route>
      <Route path='/student-see-quiz-results/:Quizz_ID' element={<SPrivateRoute><SSeeQuizResult/></SPrivateRoute>}></Route>
      <Route path='/student-see-quizes/:Course_ID' element={<SPrivateRoute><SSeeQuizes/></SPrivateRoute>}></Route>
 
////////////////////////////////////////////////////////////////////////////////////

      <Route path='/teacher-login' element={<TRedirectIfLoggedIn><TLogin/></TRedirectIfLoggedIn>}></Route>
      <Route path='/teacher-register' element={<TRedirectIfLoggedIn><TRegister/></TRedirectIfLoggedIn>}></Route>
      <Route path='/teacher-dashboard' element={<TPrivateRoute><TDashBoard/></TPrivateRoute>}></Route>
      <Route path='/teacher-create-quiz/:Quizz_ID' element={<TPrivateRoute><TCreatetQuiz/></TPrivateRoute>}></Route>
      <Route path='/teacher-see-quiz-results/:Quizz_ID' element={<TPrivateRoute><TSeeQuizResult/></TPrivateRoute>}></Route>
      <Route path='/teacher-see-quizes/:Course_ID' element={<TPrivateRoute><TSeeQuizes/></TPrivateRoute>}></Route>
  
    </Routes>
  </BrowserRouter>
  );
}

export default App;


