import "./App.css";
import Menubar from "./Component/Landingpage/Menubar/Menubar";
import Login from "./Component/Landingpage/Login/Login";
import RegisterPage from "./Component/Landingpage/Register/Register";
import { Footer } from "./Component/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetail from "./Component/Admin/Coursedetail/Coursedetail";
import Inprogress from "./Component/Student/Inprogresscourses/Inprogress";
import Coursecompleted from "./Component/Student/Coursecompleted/Coursecompleted";
import Coursemenubar from "./Component/Student/Coursemenubar/Coursemenubar";
import Contentmodule from "./Component/Instructor/Contentmodule/Contentmodule";
import Sidebarcomp from "./Component/sidebarcomp/sidebarcomp";
import DashboardLayout from "./Component/DashboardLayout/DashboardLayout";
import Admindashboard from "./Component/Admin/Admindashboard/Admindashboard";
import Courseupdation from "./Component/Admin/Courseupdation/Courseupdation";
import Dashboardinstructor from "./Component/Instructor/Dashboardinstructor/Dashboardinstructor";
import Sidebarinstructor from "./Component/Instructor/Sidebarinstructor/Sidebarinstructor";
import Ongoingclass from "./Component/Student/OngoingClass/Ongoingclass";
import RichTextEditorql from "./Component/RichTextEditor/RichTextEditor";
import AdminCredential from "./Component/Admin/Admincredential/Admincredential";
import Categorycreation from "./Component/Admin/Categorycreation/Categorycreation";
import CategoryDropdown from "./Component/Instructor/Categorytree/CategoryDropdown";
import EditorComponent from "./Component/Instructor/Rcheditor/Rcheditor";
import Question from "./Component/Instructor/Question/Question";
// import DisplayContent from "./Component/Admin/Coursecontent/DisplayContent";
import CategoryQuizList from "./Component/Instructor/Questionbank/CategoryQuizList";
import Courselist from "./Component/Instructor/Courselist/Courselist";
import Drkenhome from "./Component/Drken/Drkenhomepage/Drkenhome";
import Courseview from "./Component/Drken/Courseview/Courseview";
import Drmenubar from "./Component/Drken/Drmenubar/Drmenubar";
import Coursevideos from "./Component/Drken/Coursevideos/Coursevideos";
import Videocontent from "./Component/Drken/Videocontent/Videocontent";
import Grade from "./Component/Drken/Grade/Grade";
import CertificateBadge from "./Component/Drken/Badge/CertificateBadge";
import Lessons from "./Component/Drken/Lessons/Lessons";
import Instructors from "./Component/Drken/Instructors/Instructors";
import Overview from "./Component/Drken/Overview/Overview";
import Availablecourses from "./Component/Drken/Availablecourses/Availablecourses";
// import QuestionDisplay from "./Component/Drken/Coursevideos/Questiondisplay";
import Kencoursedashboard from "./Component/Drken/Kencoursedashboard/Kencoursedashboard";
import CourseVideos from "./Component/Drken/Coursevideos/Coursevideos";
import DrmenubarUser from "./Component/Drken/Drmenubar/DrmenubarUser";
import AddCategory from "./Component/Instructor/AddCategory/AddCategory";
import AddCourse from "./Component/Instructor/AddCourse/AddCourse";
import Modulepage from "./Component/Instructor/Modulepage/Modulepage";
import Coursecontent from "./Component/Instructor/Coursecontent/Coursecontent";
import ModuleUpdate from "./Component/Instructor/ModuleUpdate/ModuleUpdate";
import CoursecontentUpdate from "./Component/Instructor/CoursecontentUpdate/CoursecontentUpdate";
import QuestionUpdate from "./Component/Instructor/QuestionUpdate/QuestionUpdate";
import Module from "./Component/Instructor/Module/Module";
import CourseContentPage from "./Component/Instructor/CourseContentPage/CourseContentPage";
import QuestionPage from "./Component/Instructor/QuestionPage/QuestionPage";
import { Indiviualmenu } from "./Component/User/UserProfile/UserProfile";
import UpdateCourse from "./Component/Instructor/UpdateCourse/UpdateCourse";
import DashBoardProfile, {
  DashBoardMessage,
  DashBoardPayment,
} from "./Component/User/Dash/Dash";
import { Edit } from "./Component/User/Profile/Edit";
import { Dashboard } from "./Component/Admin/Dashboard/Dashboard";
import CompanyRegister from "./Component/Landingpage/CompanyRegister/CompanyRegister";
import { LicensePurchase } from "./Component/Admin/LicensePurchase/LicensePurchase";
import { CheckPayment } from "./Component/Admin/CheckPayment/CheckPayment";
import { NeftPayment } from "./Component/Admin/NeftPayment/NeftPayment";
import InvitedRegister from "./Component/Landingpage/InvitedRegister/InvitedRegister";
import { Notenrolledfile } from "./Component/Admin/Notenrolledfile/Notenrolledfile";
import SuperAdminDashboard from "./Component/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard";
import { SuperDashboard } from "./Component/SuperAdmin/Dashboard/SuperDashboard";
import { Approve } from "./Component/SuperAdmin/Approve/Approve";
import MapComponent from "./Component/Drken/Mapcomponent/Mapcomponent";
import CourseList from "./Component/Admin/CourseList/CourseList";

// import RichTextEditor from './Component/Instructor/Richtexteditor/Richtexteditor';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/inv_register/:id" element={<InvitedRegister />} />
          <Route path="/business_register" element={<CompanyRegister />} />
          {/* <Route path="/" element={[<Menubar />, <Banner />, <Footer />]} /> */}

          <Route
            path="/progress"
            element={[
              <Menubar />,
              <Coursemenubar />,
              <Inprogress />,
              <Footer />,
            ]}
          />

          <Route
            path="/completed"
            element={[
              <Menubar />,
              <Coursemenubar />,
              <Coursecompleted />,
              <Footer />,
            ]}
          />
          <Route path="/course" element={<Contentmodule />} />

          <Route
            path="/ongoing"
            element={[<Menubar />, <Coursemenubar />, <Ongoingclass />]}
          />
          {/* <Route path='/rch' element={<RichTextEditorql/>}/> */}

          <Route path="/superadmin/:id*" element={<SuperAdminDashboard />}>
            <Route path="dashboard" element={<SuperDashboard />} />
            <Route path="approve" element={<Approve />} />
          </Route>

          <Route path="/admindashboard/:id*" element={<Admindashboard />}>
            <Route path="coursedetail" element={<CourseDetail />} />
            <Route path="courseupdate" element={<Courseupdation />} />
            <Route path="admincredential" element={<AdminCredential />} />
            <Route path="category" element={<Categorycreation />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="purlicense" element={<LicensePurchase />} />
            <Route path="check/:quantity" element={<CheckPayment />} />
            <Route path="neft/:quantity" element={<NeftPayment />} />
            <Route path="notenroll" element={<Notenrolledfile />} />
            <Route path="courselist" element={<CourseList />} />
          </Route>

          <Route
            path="/instructordashboard/:id*"
            element={<Dashboardinstructor />}
          >
            <Route path="courselist" element={<Courselist />} />
            <Route path="coursecontent" element={<CourseContentPage />} />
            <Route
              path="addpagecontent"
              element={[<CourseContentPage />, <Coursecontent />]}
            />
            <Route
              path="updatepagecontent"
              element={[<CourseContentPage />, <CoursecontentUpdate />]}
            />
            <Route path="coursemodule" element={<Module />} />
            <Route path="addmodule" element={[<Module />, <Modulepage />]} />
            <Route
              path="updatemodule"
              element={[<Module />, <ModuleUpdate />]}
            />
            <Route path="quilltxt" element={<QuestionPage />} />
            <Route
              path="addquestion"
              element={[<QuestionPage />, <Question />]}
            />
            <Route
              path="updatequestion"
              element={[<QuestionPage />, <QuestionUpdate />]}
            />
            <Route path="questionbank" element={<CategoryQuizList />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="coursecreation" element={<AddCourse />} />
            <Route path="coursecreation/:course" element={<UpdateCourse />} />
          </Route>
          <Route path="/instructorsidebar" element={<Sidebarinstructor />} />
          <Route
            path="/teacherdashboard/*"
            element={<Dashboardinstructor />}
          ></Route>
          <Route path="/dropdowncategory" element={<CategoryDropdown />} />
          <Route path="/editor" element={<EditorComponent />} />
          <Route path="/questioncreation" element={<Question />} />
          {/* //DrKen */}
          {/* <Route path="/cr" element={[<Drmenubar />, <Coursevideos/>]} /> */}
          <Route path="/" element={[<Drmenubar />, <Drkenhome />]} />
          <Route
            path="/user/:id"
            element={[<DrmenubarUser />, <Drkenhome />]}
          />
          <Route
            path="/videos/:id"
            element={[<DrmenubarUser />, <Videocontent />]}
          />
          <Route path="/grade/:id" element={[<DrmenubarUser />, <Grade />]} />
          <Route
            path="/badge/:id"
            element={[<DrmenubarUser />, <CertificateBadge />]}
          />
          {/* <Route path="/courseview" element={<Courseview/>}/> */}
          <Route path="/lesson" element={<Lessons />} />
          <Route path="/instructor" element={<Instructors />} />
          <Route path="/courseoverview" element={<Overview />} />
          <Route path="/courseview" element={<Courseview />} />
          <Route path="/allcourselist/:id" element={<Availablecourses />} />
          {/* <Route path="/quizquestions" element={<QuestionDisplay />} /> */}
          <Route
            path="/ken/:course/:module/:id"
            element={[<DrmenubarUser />, <CourseVideos />]}
          />
          <Route
            path="/ken/:course/:module/undefined"
            element={[<Drmenubar />, <CourseVideos />]}
          />
          {/* User Route */}
          <Route
            path="/user/:id/profile"
            element={[<DrmenubarUser />, <DashBoardProfile />]}
          />
          <Route path="/user/:id/message" element={<DashBoardMessage />} />
          <Route path="/user/:id/payment" element={<DashBoardPayment />} />
          <Route path="/user/:id/editprofile" element={<Edit />} />
          <Route path="/mp" element={<MapComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
