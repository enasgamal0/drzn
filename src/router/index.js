// Start:: Importing Middleware
import auth from "../middleware/auth.js";
import Authentication from "../pages/Authentication.vue";
// End:: Importing Middleware

// Start:: Importing Router Components
import Vue from "vue";
import VueRouter from "vue-router";
import { mapPermissionsToAbilityCombos } from "@/utils/permissionAdapter";
// End:: Importing Router Components

// ============== Start:: Home Page Route
import AppContentWrapper from "../pages/AppContentWrapper.vue";
import HomePage from "../pages/HomePage.vue";
// ============== End:: Home Page Route

// ============== Start:: Roles Routes
import RolesHome from "../views/Cruds/Roles/Home.vue";
import AllRoles from "../views/Cruds/Roles/ShowAll.vue";
import EditRole from "../views/Cruds/Roles/Edit.vue";
import CreateRole from "../views/Cruds/Roles/Create.vue";
// ============== End:: Roles Routes

// ============== Start:: Financial Reports Routes
import FinancialReportsHome from "../views/Cruds/FinancialReports/Home.vue";
import AllFinancialReports from "../views/Cruds/FinancialReports/ShowAll.vue";
// ============== End:: Financial Reports Routes

// ============== Start:: Financial Reports Routes
import PackagesFinancialReportsHome from "../views/Cruds/PackagesFinancialReports/Home.vue";
import AllPackagesFinancialReports from "../views/Cruds/PackagesFinancialReports/ShowAll.vue";
// ============== End:: Financial Reports Routes

// ============== Start:: FinancialfinshedReports Routes
import FinancialFinshedReportsHome from "../views/Cruds/FinancialFinshedReports/Home.vue";
import AllFinancialFinshedReports from "../views/Cruds/FinancialFinshedReports/ShowAll.vue";
import ShowFinancialFinshedReport from "../views/Cruds/FinancialFinshedReports/Show.vue";
// ============== End:: FinancialfinshedReports Routes

// ============== Start:: FinancialOrders Routes
import FinancialOrdersHome from "../views/Cruds/FinancialOrders/Home.vue";
import AllFinancialOrders from "../views/Cruds/FinancialOrders/ShowAll.vue";
// ============== End:: FinancialOrders Routes

// ============== Start:: FinancialPack Routes
import FinancialPackHome from "../views/Cruds/FinancialPack/Home.vue";
import AllFinancialPack from "../views/Cruds/FinancialPack/ShowAll.vue";
// ============== End:: FinancialPack Routes

// ============== Start:: AppRates Routes
import AppRatesHome from "../views/Cruds/AppRates/Home.vue";
import AllAppRates from "../views/Cruds/AppRates/ShowAll.vue";
import ShowAppRates from "../views/Cruds/AppRates/Show.vue";
// ============== End:: AppRates Routes

// ============== Start:: ReferralCodes Routes
import ReferralCodesHome from "../views/Cruds/ReferralCodes/Home.vue";
import AllReferralCodes from "../views/Cruds/ReferralCodes/ShowAll.vue";
import ShowReferralCodes from "../views/Cruds/ReferralCodes/Show.vue";
// ============== End:: ReferralCodes Routes

// ============== Start:: OrdersAndQuotations Routes
import OrdersAndQuotationsHome from "../views/Cruds/OrdersAndQuotations/Home.vue";
import AllOrdersAndQuotations from "../views/Cruds/OrdersAndQuotations/ShowAll.vue";
import ShowOrdersAndQuotations from "../views/Cruds/OrdersAndQuotations/Show.vue";
// ============== End:: OrdersAndQuotations Routes

// ============== Start:: StoreRates Routes
import StoreRatesHome from "../views/Cruds/StoreRates/Home.vue";
import AllStoreRates from "../views/Cruds/StoreRates/ShowAll.vue";
// ============== End:: StoreRates Routes

// ============== Start:: Admins Routes
import ShowAdmin from "../views/Cruds/Admins/Show.vue";
import EditAdmin from "../views/Cruds/Admins/Edit.vue";
import CreateAdmin from "../views/Cruds/Admins/Create.vue";
import AllAdmins from "../views/Cruds/Admins/ShowAll.vue";
import AdminsHome from "../views/Cruds/Admins/Home.vue";
// ============== End:: Admins Routes

// ============== Start:: login Routes
import LoginForm from "../views/Auth/LoginForm.vue";
import ResetPasswordEmailForm from "../views/Auth/ResetPasswordEmailForm.vue";
import EmailVerificationForm from "../views/Auth/EmailVerificationForm.vue";
import ChangePhoneNumberForm from "../views/Auth/ChangePhoneNumber.vue";
import ResetPasswordForm from "../views/Auth/ResetPasswordForm.vue";
// ============== End:: login Routes

// ============== Start:: Contact Messages Routes
import ContactMessagesHome from "../views/Cruds/ContactMessages/Home.vue";
import AllContactMessages from "../views/Cruds/ContactMessages/ShowAll.vue";
import showMessage from "../views/Cruds/ContactMessages/Show.vue";
// ============== End:: Contact Messages Routes

// ============== Start:: App Content Routes
import AppContentHome from "../views/Cruds/AppContent/Home.vue";
import GeneralSettings from "../views/Cruds/AppSettings/GeneralSettings.vue";
import AppSettings from "../views/Cruds/AppSettings/AppSettings.vue";
import AboutUs from "../views/Cruds/AppContent/AboutUs.vue";
import Addresses from "../views/Cruds/AppContent/Addresses.vue";
import Terms from "../views/Cruds/AppContent/Terms.vue";
import DeleteAccount from "../views/Cruds/AppContent/DeleteAccount.vue";
import PrivacyPolicy from "../views/Cruds/AppContent/PrivacyPolicy.vue";
import TermsProvider from "../views/Cruds/AppContent/TermsProvider.vue";
import Goals from "../views/Cruds/AppContent/Goals.vue";
import Message from "../views/Cruds/AppContent/Message.vue";
import Vision from "../views/Cruds/AppContent/Vision.vue";
import Statistics from "../views/Cruds/AppContent/Statistics.vue";
import Influencer from "../views/Cruds/AppContent/Influencer.vue";
// ============== End:: App Content Routes

// Start:: Questiions Router Components
import questionsHome from "../views/Cruds/FAQ/Home.vue";
import Allquestions from "../views/Cruds/FAQ/ShowAll.vue";
import Createquestions from "../views/Cruds/FAQ/Create.vue";
import Editquestions from "../views/Cruds/FAQ/Edit.vue";
// End:: Questions Router Components

// ============ Start:: Users Routes
import UsersHome from "../views/Cruds/Users/Home.vue";
import AllUsers from "../views/Cruds/Users/ShowAll.vue";
import ShowUsers from "../views/Cruds/Users/Show.vue";
// ============ End:: Users Routes

// ============== Start:: Ads Routes
import AdsHome from "../views/Cruds/Ads/Home.vue";
import AllAds from "../views/Cruds/Ads/ShowAll.vue";
import CreateAds from "../views/Cruds/Ads/Create.vue";
import ShowAds from "../views/Cruds/Ads/Show.vue";
import EditAds from "../views/Cruds/Ads/Edit.vue";
// ============== End:: Ads Routes

// ============== Start:: Splash Routes
import SplashHome from "../views/Cruds/Splash/Home.vue";
import AllSplash from "../views/Cruds/Splash/ShowAll.vue";
import CreateSplash from "../views/Cruds/Splash/Create.vue";
import ShowSplash from "../views/Cruds/Splash/Show.vue";
import EditSplash from "../views/Cruds/Splash/Edit.vue";
// ============== End:: Splash Routes

// ============== Start:: Products Routes
import ProductsHome from "../views/Cruds/Products/Home.vue";
import AllProducts from "../views/Cruds/Products/ShowAll.vue";
import CreateProducts from "../views/Cruds/Products/Create.vue";
import ShowProducts from "../views/Cruds/Products/Show.vue";
import EditProducts from "../views/Cruds/Products/Edit.vue";
// ============== End:: Products Routes

// ============== Start:: Recommendations Routes
import RecommendationsHome from "../views/Cruds/Recommendations/Home.vue";
import AllRecommendations from "../views/Cruds/Recommendations/ShowAll.vue";
import CreateRecommendations from "../views/Cruds/Recommendations/Create.vue";
import ShowRecommendations from "../views/Cruds/Recommendations/Show.vue";
import EditRecommendations from "../views/Cruds/Recommendations/Edit.vue";
// ============== End:: Recommendations Routes

// ============== Start:: Countries Routes
import CountriesHome from "../views/Cruds/Countries/Home.vue";
import AllCountries from "../views/Cruds/Countries/ShowAll.vue";
import CreateCountries from "../views/Cruds/Countries/Create.vue";
import ShowCountries from "../views/Cruds/Countries/Show.vue";
import EditCountries from "../views/Cruds/Countries/Edit.vue";
// ============== End:: Countries Routes

// ============== Start:: Hobbies Routes
import HobbiesHome from "../views/Cruds/Hobbies/Home.vue";
import AllHobbies from "../views/Cruds/Hobbies/ShowAll.vue";
import CreateHobbies from "../views/Cruds/Hobbies/Create.vue";
import ShowHobbies from "../views/Cruds/Hobbies/Show.vue";
import EditHobbies from "../views/Cruds/Hobbies/Edit.vue";
// ============== End:: Hobbies Routes
// ============== Start:: CustomerOpinions Routes
import CustomerOpinionsHome from "../views/Cruds/Opinions/Home.vue";
import AllCustomerOpinions from "../views/Cruds/Opinions/ShowAll.vue";
import CreateCustomerOpinions from "../views/Cruds/Opinions/Create.vue";
import ShowCustomerOpinions from "../views/Cruds/Opinions/Show.vue";
import EditCustomerOpinions from "../views/Cruds/Opinions/Edit.vue";
// ============== End:: CustomerOpinions Routes
// ============== Start:: Nationalities Routes
import NationalitiesHome from "../views/Cruds/Nationalities/Home.vue";
import AllNationalities from "../views/Cruds/Nationalities/ShowAll.vue";
import CreateNationalities from "../views/Cruds/Nationalities/Create.vue";
import ShowNationalities from "../views/Cruds/Nationalities/Show.vue";
import EditNationalities from "../views/Cruds/Nationalities/Edit.vue";
// ============== End:: Nationalities Routes

// ============== Start:: Durations Routes
import DurationsHome from "../views/Cruds/Durations/Home.vue";
import AllDurations from "../views/Cruds/Durations/ShowAll.vue";
import CreateDurations from "../views/Cruds/Durations/Create.vue";
import ShowDurations from "../views/Cruds/Durations/Show.vue";
import EditDurations from "../views/Cruds/Durations/Edit.vue";
// ============== End:: Durations Routes

// ============== Start:: Districts Routes
import DistrictsHome from "../views/Cruds/Districts/Home.vue";
import AllDistricts from "../views/Cruds/Districts/ShowAll.vue";
import CreateDistricts from "../views/Cruds/Districts/Create.vue";
import ShowDistricts from "../views/Cruds/Districts/Show.vue";
import EditDistricts from "../views/Cruds/Districts/Edit.vue";
// ============== End:: Districts Routes

// ============== Start:: Cities Routes
import CitiesHome from "../views/Cruds/Cities/Home.vue";
import AllCities from "../views/Cruds/Cities/ShowAll.vue";
import CreateCities from "../views/Cruds/Cities/Create.vue";
import EditCities from "../views/Cruds/Cities/Edit.vue";
// ============== End:: Cities Routes

// ============== Start:: Areas Routes
import AreasHome from "../views/Cruds/Areas/Home.vue";
import AllAreas from "../views/Cruds/Areas/ShowAll.vue";
import CreateAreas from "../views/Cruds/Areas/Create.vue";
import ShowAreas from "../views/Cruds/Areas/Show.vue";
import EditAreas from "../views/Cruds/Areas/Edit.vue";
// ============== End:: Areas Routes

// ============== Start:: Sectors Routes
import SectorsHome from "../views/Cruds/Sectors/Home.vue";
import AllSectors from "../views/Cruds/Sectors/ShowAll.vue";
import CreateSectors from "../views/Cruds/Sectors/Create.vue";
import ShowSectors from "../views/Cruds/Sectors/Show.vue";
import EditSectors from "../views/Cruds/Sectors/Edit.vue";
// ============== End:: Sectors Routes

// ============== Start:: Services Routes
import ServicesHome from "../views/Cruds/Services/Home.vue";
import AllServices from "../views/Cruds/Services/ShowAll.vue";
import CreateServices from "../views/Cruds/Services/Create.vue";
import ShowServices from "../views/Cruds/Services/Show.vue";
import EditServices from "../views/Cruds/Services/Edit.vue";
// ============== End:: Services Routes

// ============== Start:: Workplaces Routes
import WorkplacesHome from "../views/Cruds/Workplaces/Home.vue";
import AllWorkplaces from "../views/Cruds/Workplaces/ShowAll.vue";
import CreateWorkplaces from "../views/Cruds/Workplaces/Create.vue";
import ShowWorkplaces from "../views/Cruds/Workplaces/Show.vue";
import EditWorkplaces from "../views/Cruds/Workplaces/Edit.vue";
// ============== End:: Workplaces Routes

// ============== Start:: WalletRequests Routes
import RequestWalletsHome from "../views/Cruds/WalletRequests/Home.vue";
import AllRequestWallets from "../views/Cruds/WalletRequests/ShowAll.vue";
// ============== End:: WalletRequests Routes

// ============== Start:: WalletHistory Routes
import WalletHistoryHome from "../views/Cruds/WalletHistory/Home.vue";
import AllWalletHistory from "../views/Cruds/WalletHistory/ShowAll.vue";
// ============== End:: WalletRequests Routes

// ============== Start:: Reasons Routes
import ReasonsHome from "../views/Cruds/Reasons/Home.vue";
import AllReasons from "../views/Cruds/Reasons/ShowAll.vue";
import CreateReasons from "../views/Cruds/Reasons/Create.vue";
import ShowReasons from "../views/Cruds/Reasons/Show.vue";
import EditReasons from "../views/Cruds/Reasons/Edit.vue";
// ============== End:: Reasons Routes

// ============== Start:: Banks Routes
import BanksHome from "../views/Cruds/Banks/Home.vue";
import AllBanks from "../views/Cruds/Banks/ShowAll.vue";
import CreateBanks from "../views/Cruds/Banks/Create.vue";
import ShowBanks from "../views/Cruds/Banks/Show.vue";
import EditBanks from "../views/Cruds/Banks/Edit.vue";
// ============== End:: Banks Routes

// ============== Start:: Auctions Routes
import AuctionsHome from "../views/Cruds/Auctions/Home.vue";
import AllAuctions from "../views/Cruds/Auctions/ShowAll.vue";
import ShowAuctions from "../views/Cruds/Auctions/Show.vue";
// ============== End:: Auctions Routes

// ============== Start:: Packages Routes
import PackagesHome from "../views/Cruds/Packages/Home.vue";
import AllPackages from "../views/Cruds/Packages/ShowAll.vue";
import CreatePackages from "../views/Cruds/Packages/Create.vue";
import ShowPackages from "../views/Cruds/Packages/Show.vue";
import EditPackages from "../views/Cruds/Packages/Edit.vue";
// ============== End:: Packages Routes

// ============== Start:: orders Routes
import ordersHome from "../views/Cruds/Orders/Home.vue";
import Allorders from "../views/Cruds/Orders/ShowAll.vue";
import Showorders from "../views/Cruds/Orders/Show.vue";
// ============== End:: orders Routes

// ============== Start:: UserRequests Routes =================
import UserRequestsHome from "../views/Cruds/UserRequests/Home.vue";
import AllUserRequests from "../views/Cruds/UserRequests/ShowAll.vue";
import ShowUserRequests from "../views/Cruds/UserRequests/Show.vue";
// ============== Start:: UserRequests Routes =================

// ============== Start:: UserRequests Routes =================
import ClientRequestsHome from "../views/Cruds/ClientRequests/Home.vue";
import AllClientRequests from "../views/Cruds/ClientRequests/ShowAll.vue";
import ShowClientRequests from "../views/Cruds/ClientRequests/Show.vue";
// ============== Start:: UserRequests Routes =================

// ============== Start:: Influencers Routes
import InfluencersHome from "../views/Cruds/Influencers/Home.vue";
import AllInfluencers from "../views/Cruds/Influencers/ShowAll.vue";
import CreateInfluencers from "../views/Cruds/Influencers/Create.vue";
import ShowInfluencers from "../views/Cruds/Influencers/Show.vue";
import EditInfluencers from "../views/Cruds/Influencers/Edit.vue";
import ShowInfluencersAccounts from "../views/Cruds/Influencers/ShowAccounts.vue";
// ============== End:: Influencers Routes

// ============== Start:: Blogs Routes
import BlogsHome from "../views/Cruds/Blogs/Home.vue";
import AllBlogs from "../views/Cruds/Blogs/ShowAll.vue";
import CreateBlogs from "../views/Cruds/Blogs/Create.vue";
import ShowBlogs from "../views/Cruds/Blogs/Show.vue";
import EditBlogs from "../views/Cruds/Blogs/Edit.vue";
// ============== End:: Blogs Routes

// ============== Start:: All Notifications Routes
import AllNotifications from "../views/Cruds/Notifications/ShowAll.vue";
import NotificationsHome from "../views/Cruds/Notifications/Home.vue";
import CreateNotifications from "../views/Cruds/Notifications/Create.vue";
import ShowNotificationsTable from "../views/Cruds/Notifications/Show.vue";
// import ShowNotificationsIcon from "../views/Cruds/Notifications/Test.vue";
import ShowAllNotifications from "../views/Cruds/Notifications/ShowAllNotifications.vue";

// ============== End:: All Notifications Routes

// ================== Start:: Clients Routes
import ClientsHome from "../views/Cruds/Clients/Home.vue";
import AllClients from "../views/Cruds/Clients/ShowAll.vue";
// import CreateClients from "../views/Cruds/Clients/Create.vue";
// import EditClients from "../views/Cruds/Clients/Edit.vue";
import ShowClients from "../views/Cruds/Clients/Show.vue";
// ================= End:: Clients Routes

// ================== Start:: Providers Routes
import ProvidersHome from "../views/Cruds/Providers/Home.vue";
import AllProviders from "../views/Cruds/Providers/ShowAll.vue";
import CreateProviders from "../views/Cruds/Providers/Create.vue";
import EditProviders from "../views/Cruds/Providers/Edit.vue";
import ShowProviders from "../views/Cruds/Providers/Show.vue";
// ================= End:: Providers Routes

// ================== Start:: Customers Routes
import CustomersHome from "../views/Cruds/Customers/Home.vue";
import AllCustomers from "../views/Cruds/Customers/ShowAll.vue";
import CreateCustomers from "../views/Cruds/Customers/Create.vue";
import EditCustomers from "../views/Cruds/Customers/Edit.vue";
import ShowCustomers from "../views/Cruds/Customers/Show.vue";
// ================= End:: Customers Routes

//=============== Start:: Order Desiginer Routes
import OrdersRequestsHome from "../views/Cruds/OrdersRequests/Home.vue";
import AllOrdersRequests from "../views/Cruds/OrdersRequests/ShowAll.vue";
import ShowOrdersRequests from "../views/Cruds/OrdersRequests/Show.vue";
//============== End:: Order Desiginer Routes

// ============== Start:: MainCategories Routes
import CategoriesHome from "../views/Cruds/MainCategories/Home.vue";
import AllCategories from "../views/Cruds/MainCategories/ShowAll.vue";
import CreateCategories from "../views/Cruds/MainCategories/Create.vue";
import EditCategories from "../views/Cruds/MainCategories/Edit.vue";
import ShowCategories from "../views/Cruds/MainCategories/Show.vue";
// ============== End:: MainCategories Routes

// ============== Start:: SubCategories Routes
import SubCategoriesHome from "../views/Cruds/SubCategories/Home.vue";
import AllSubCategories from "../views/Cruds/SubCategories/ShowAll.vue";
import CreateSubCategories from "../views/Cruds/SubCategories/Create.vue";
import EditSubCategories from "../views/Cruds/SubCategories/Edit.vue";
import ShowSubCategories from "../views/Cruds/SubCategories/Show.vue";
// ============== End:: SubCategories Routes

// ============== Start:: SubCategoriesQuestions Routes
import SubCategoriesQuestionsHome from "../views/Cruds/SubCategoriesQuestions/Home.vue";
import AllSubCategoriesQuestions from "../views/Cruds/SubCategoriesQuestions/ShowAll.vue";
import CreateSubCategoriesQuestions from "../views/Cruds/SubCategoriesQuestions/Create.vue";
import EditSubCategoriesQuestions from "../views/Cruds/SubCategoriesQuestions/Edit.vue";
import ShowSubCategoriesQuestions from "../views/Cruds/SubCategoriesQuestions/Show.vue";
import SubCategories from "../views/Cruds/SubCategoriesQuestions/SubCategories.vue";
// ============== End:: SubCategoriesQuestions Routes

// ============== Start:: Coupons Routes
import CouponsHome from "../views/Cruds/Coupons/Home.vue";
import AllCoupons from "../views/Cruds/Coupons/ShowAll.vue";
import CreateCoupons from "../views/Cruds/Coupons/Create.vue";
import ShowCoupons from "../views/Cruds/Coupons/Show.vue";
import EditCoupons from "../views/Cruds/Coupons/Edit.vue";
// ============== End:: Coupons Routes

// ============== Start:: Capacities Routes
import CapacitiesHome from "../views/Cruds/Capacities/Home.vue";
import AllCapacities from "../views/Cruds/Capacities/ShowAll.vue";
import CreateCapacities from "../views/Cruds/Capacities/Create.vue";
import ShowCapacities from "../views/Cruds/Capacities/Show.vue";
import EditCapacities from "../views/Cruds/Capacities/Edit.vue";
// ============== End:: Capacities Routes

// ============== Start:: ResidentialAdd Routes
import ResidentialAddHome from "../views/Cruds/ResidentialAdd/Home.vue";
import AllResidentialAdd from "../views/Cruds/ResidentialAdd/ShowAll.vue";
import CreateResidentialAdd from "../views/Cruds/ResidentialAdd/Create.vue";
import ShowResidentialAdd from "../views/Cruds/ResidentialAdd/Show.vue";
import EditResidentialAdd from "../views/Cruds/ResidentialAdd/Edit.vue";
// ============== End:: ResidentialAdd Routes

// ============== Start:: Managements Routes
import ManagementsHome from "../views/Cruds/Managements/Home.vue";
import AllManagements from "../views/Cruds/Managements/ShowAll.vue";
import CreateManagements from "../views/Cruds/Managements/Create.vue";
import EditManagements from "../views/Cruds/Managements/Edit.vue";
import ShowManagements from "../views/Cruds/Managements/Show.vue";
// ============== End:: Managements Routes

// ============== Start:: Forbidden Route
import ForbiddenPage from "../pages/ForbiddenPage.vue";
// ============== End:: Forbidden Route

// ============== Start:: Not Found Route
import NotFoundPage from "../pages/NotFound.vue";
// ============== End:: Not Found Route

// End:: Importing Router Components

Vue.use(VueRouter);
const routes = [
  // ***************** Start:: Auth Routes Config
  {
    path: "/",
    component: Authentication,
    children: [
      {
        path: "/",
        component: LoginForm,
        name: "LoginForm",
      },
      {
        path: "/reset-password-email",
        name: "ResetPasswordEmailForm",
        component: ResetPasswordEmailForm,
      },
      {
        path: "/email-verification/:verification_type",
        name: "EmailVerificationForm",
        component: EmailVerificationForm,
      },
      {
        path: "/chang-phone-number",
        name: "ChangePhoneNumberForm",
        component: ChangePhoneNumberForm,
      },
      {
        path: "/reset-password",
        name: "ResetPasswordForm",
        component: ResetPasswordForm,
      },
    ],
  },
  // ***************** End:: Auth Routes Config

  // ***************** Start:: Content Routes Config
  {
    path: "/home",
    component: AppContentWrapper,
    children: [
      // Start:: Home Route Config
      {
        path: "/home",
        component: HomePage,
        meta: {
          middleware: [auth],
        },
      },
      // End:: Home Route Config

      // Start:: Contact Messages Routes Config
      {
        path: "/contact-messages",
        name: "ContactMessagesHome",
        component: ContactMessagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllContactMessages",
            component: AllContactMessages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "contacts index",
                subject: "contacts",
              },
            },
          },
          {
            path: "show/:id",
            name: "showMessage",
            component: showMessage,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "contacts show",
                subject: "contacts",
              },
            },
          },
        ],
      },
      // End:: Contact Messages Routes Config

      // Start:: App Content Routes Config
      {
        path: "/app-content",
        name: "AppContentHome",
        component: AppContentHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "about-us",
            name: "AboutUs",
            component: AboutUs,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          // {
          //   path: "addresses",
          //   name: "Addresses",
          //   component: Addresses,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "settings create",
          //       subject: "settings",
          //     },
          //   },
          // },
          {
            path: "terms",
            name: "Terms",
            component: Terms,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          // {
          //   path: "provider-terms",
          //   name: "TermsProvider",
          //   component: TermsProvider,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "settings create",
          //       subject: "settings",
          //     },
          //   },
          // },
          {
            path: "delete-account",
            name: "DeleteAccount",
            component: DeleteAccount,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          // {
          //   path: "vision",
          //   name: "Vision",
          //   component: Vision,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "settings create",
          //       subject: "settings",
          //     },
          //   },
          // },
          // {
          //   path: "message",
          //   name: "Message",
          //   component: Message,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "settings create",
          //       subject: "settings",
          //     },
          //   },
          // },
          // {
          //   path: "goals",
          //   name: "Goals",
          //   component: Goals,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "settings create",
          //       subject: "settings",
          //     },
          //   },
          // },
          // {
          //   path: "statistics",
          //   name: "Statistics",
          //   component: Statistics,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "settings create",
          //       subject: "settings",
          //     },
          //   },
          // },
          // {
          //   path: "influencer",
          //   name: "Influencer",
          //   component: Influencer,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "settings create",
          //       subject: "settings",
          //     },
          //   },
          // },
        ],
      },
      // End:: App Content Routes Config

      // Start:: AllFinancialOrders Routes Config
      // {
      //   path: "/financialorders",
      //   name: "FinancialOrdersHome",
      //   component: FinancialOrdersHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "AllFinancialOrders",
      //       component: AllFinancialOrders,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "roles index",
      //           subject: "roles",
      //         },
      //       },
      //     },
      //   ],
      // },
      // {
      //   path: "/financialpack",
      //   name: "FinancialPackHome",
      //   component: FinancialPackHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "AllFinancialPack",
      //       component: AllFinancialPack,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "roles index",
      //           subject: "roles",
      //         },
      //       },
      //     },
      //   ],
      // },

      // Start:: Financial Reports Routes Config
      {
        path: "/auctions-financial-reports",
        name: "FinancialReportsHome",
        component: FinancialReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFinancialReports",
            component: AllFinancialReports,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "financial_reports unfinishedordersreports",
                subject: "financial_reports",
              },
            },
          },
        ],
      },

      {
        path: "/financial-finished-reports",
        name: "FinancialFinshedReportsHome",
        component: FinancialFinshedReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFinancialFinshedReports",
            component: AllFinancialFinshedReports,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "financial_reports finishedordersreports",
                subject: "financial_reports",
              },
            },
          },
        ],
      },
      // End:: Financial Reports Routes Config

      // Start:: Packages Financial Reports Routes Config
      {
        path: "/packages-financial-reports",
        name: "PackagesFinancialReportsHome",
        component: PackagesFinancialReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllPackagesFinancialReports",
            component: AllPackagesFinancialReports,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "financialreports packages",
                subject: "financialreports",
              },
            },
          },
        ],
      },
      // End:: Packages Financial Reports Routes Config

      

      // Start:: Roles Routes Config
      {
        path: "/roles",
        name: "RolesHome",
        component: RolesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRoles",
            component: AllRoles,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "-",
                subject: "roles",
              },
            },
          },
          {
            path: "create",
            name: "CreateRole",
            component: CreateRole,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles create",
                subject: "roles",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditRole",
            component: EditRole,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles edit",
                subject: "roles",
              },
            },
          },
        ],
      },
      // End:: Roles Routes Config

      // Start:: Admins Routes Config
      {
        path: "/admins",
        name: "AdminsHome",
        component: AdminsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllAdmins,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins index",
                subject: "admins",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdmin",
            component: CreateAdmin,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins create",
                subject: "admins",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdmin",
            component: EditAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins edit",
                subject: "admins",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdmin",
            component: ShowAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins show",
                subject: "admins",
              },
            },
          },
        ],
      },
      // End:: Admins Routes Config

      // Start:: users Routes Config
      {
        path: "/users",
        name: "UsersHome",
        component: UsersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllUsers",
            component: AllUsers,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users index",
                subject: "users",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowUsers",
            component: ShowUsers,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users show",
                subject: "users",
              },
            },
          },
        ],
      },
      // End:: users Routes Config

      // Start:: products  Config
      // {
      //   path: "/products",
      //   name: "products",
      //   component: ProductsHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "Allproducts",
      //       component: AllProducts,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "products index",
      //           subject: "products",
      //         },
      //       },
      //     },
      //     {
      //       path: "create",
      //       name: "Createproducts",
      //       component: CreateProducts,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "products create",
      //           subject: "products",
      //         },
      //       },
      //     },
      //     {
      //       path: "edit/:id",
      //       name: "Editproducts",
      //       component: EditProducts,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "products edit",
      //           subject: "products",
      //         },
      //       },
      //     },
      //     {
      //       path: "show/:id",
      //       name: "Showproducts",
      //       component: ShowProducts,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "products show",
      //           subject: "products",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: products Config

      // Start:: orders  Config
      // {
      //   path: "/orders",
      //   name: "orders",
      //   component: ordersHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "Allorders",
      //       component: Allorders,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "orders index",
      //           subject: "orders",
      //         },
      //       },
      //     },
      //     {
      //       path: "show/:id",
      //       name: "Showorders",
      //       component: Showorders,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "orders show",
      //           subject: "orders",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: orders Config

      // Start:: nationalities  Config
      {
        path: "/nationalities",
        name: "nationalities",
        component: NationalitiesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allnationalities",
            component: AllNationalities,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "nationalities index",
                subject: "nationalities",
              },
            },
          },
          {
            path: "create",
            name: "Createnationalities",
            component: CreateNationalities,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "nationalities create",
                subject: "nationalities",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editnationalities",
            component: EditNationalities,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "nationalities edit",
                subject: "nationalities",
              },
            },
          },
          {
            path: "show/:id",
            name: "Shownationalities",
            component: ShowNationalities,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "nationalities show",
                subject: "nationalities",
              },
            },
          },
        ],
      },
      // End:: nationalities Config
      // Start:: hobbies  Config
      {
        path: "/hobbies",
        name: "hobbies",
        component: HobbiesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allhobbies",
            component: AllHobbies,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "hobbies index",
                subject: "hobbies",
              },
            },
          },
          {
            path: "create",
            name: "Createhobbies",
            component: CreateHobbies,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "hobbies create",
                subject: "hobbies",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Edithobbies",
            component: EditHobbies,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "hobbies edit",
                subject: "hobbies",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showhobbies",
            component: ShowHobbies,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "hobbies show",
                subject: "hobbies",
              },
            },
          },
        ],
      },
      // End:: hobbies Config
      // Start:: CustomerOpinions  Config
      {
        path: "/customeropinions",
        name: "customeropinions",
        component: CustomerOpinionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCustomerOpinions",
            component: AllCustomerOpinions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "customeropinions index",
                subject: "customeropinions",
              },
            },
          },
          {
            path: "create",
            name: "CreateCustomerOpinions",
            component: CreateCustomerOpinions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "customeropinions create",
                subject: "customeropinions",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditCustomerOpinions",
            component: EditCustomerOpinions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "customeropinions edit",
                subject: "customeropinions",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowCustomerOpinions",
            component: ShowCustomerOpinions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "customeropinions show",
                subject: "customeropinions",
              },
            },
          },
        ],
      },
      // End:: CustomerOpinions Config


// Start:: recommendations Config
      {
        path: "/recommendations",
        name: "recommendations",
        component: RecommendationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allrecommendations",
            component: AllRecommendations,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "recommendations index",
                subject: "recommendations",
              },
            },
          },
          {
            path: "create",
            name: "CreateRecommendations",
            component: CreateRecommendations,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "recommendations create",
                subject: "recommendations",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditRecommendations",
            component: EditRecommendations,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "recommendations edit",
                subject: "recommendations",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowRecommendations",
            component: ShowRecommendations,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "recommendations show",
                subject: "recommendations",
              },
            },
          },
        ],
      },
      // End:: countries Config

      // Start:: countries Config
      {
        path: "/countries",
        name: "countries",
        component: CountriesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allcountries",
            component: AllCountries,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "countries index",
                subject: "countries",
              },
            },
          },
          {
            path: "create",
            name: "Createcountries",
            component: CreateCountries,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "countries create",
                subject: "countries",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editcountries",
            component: EditCountries,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "countries edit",
                subject: "countries",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showcountries",
            component: ShowCountries,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "countries show",
                subject: "countries",
              },
            },
          },
        ],
      },
      // End:: countries Config

      // Start:: districts  Config
      {
        path: "/districts",
        name: "districts",
        component: DistrictsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Alldistricts",
            component: AllDistricts,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts index",
                subject: "districts",
              },
            },
          },
          {
            path: "create",
            name: "Createdistricts",
            component: CreateDistricts,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts create",
                subject: "districts",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editdistricts",
            component: EditDistricts,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts edit",
                subject: "districts",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showdistricts",
            component: ShowDistricts,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "districts show",
                subject: "districts",
              },
            },
          },
        ],
      },
      // End:: districts Config

      // Start:: Cities  Config
      {
        path: "/cities",
        name: "cities",
        component: CitiesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allcities",
            component: AllCities,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities index",
                subject: "cities",
              },
            },
          },
          {
            path: "create",
            name: "Createcities",
            component: CreateCities,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities create",
                subject: "cities",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editcities",
            component: EditCities,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "cities edit",
                subject: "cities",
              },
            },
          },
        ],
      },
      // End:: Cities Config

      // Start:: RegionsHome  Config
      {
        path: "/areas",
        name: "areas",
        component: AreasHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAreas",
            component: AllAreas,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "areas index",
                subject: "areas",
              },
            },
          },
          {
            path: "create",
            name: "CreateAreas",
            component: CreateAreas,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "areas create",
                subject: "areas",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAreas",
            component: EditAreas,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "areas edit",
                subject: "areas",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAreas",
            component: ShowAreas,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "areas show",
                subject: "areas",
              },
            },
          },
        ],
      },
      // End:: Areas Config

      // Start:: services  Config
      {
      path: "/services",
      name: "services",
      component: ServicesHome,
      meta: {
        middleware: [auth],
      },
      children: [
        {
          path: "all",
          name: "Allservices",
          component: AllServices,
          meta: {
            middleware: [auth],
            requiresPermission: {
              action: "services index",
              subject: "services",
            },
          },
        },
        {
          path: "create",
          name: "Createservices",
          component: CreateServices,
          meta: {
            middleware: [auth],
            requiresPermission: {
              action: "services create",
              subject: "services",
            },
          },
        },
        {
          path: "edit/:id",
          name: "Editservices",
          component: EditServices,
          props: true,
          meta: {
            middleware: [auth],
            requiresPermission: {
              action: "services edit",
              subject: "services",
            },
          },
        },
        {
          path: "show/:id",
          name: "Showservices",
          component: ShowServices,
          props: true,
          meta: {
            middleware: [auth],
            requiresPermission: {
              action: "services show",
              subject: "services",
            },
          },
        },
      ],
    },
      // End:: services Config

      // Start:: Sectors Config
      {
        path: "/sectors",
        name: "sectors",
        component: SectorsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllSectors",
            component: AllSectors,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "sections index",
                subject: "sections",
              },
            },
          },
          {
            path: "create",
            name: "CreateSectors",
            component: CreateSectors,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "sections create",
                subject: "sections",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditSectors",
            component: EditSectors,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "sections edit",
                subject: "sections",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowSectors",
            component: ShowSectors,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "sections show",
                subject: "sections",
              },
            },
          },
        ],
      },
      // End:: Sectors Config

      // Start:: customers Config
      {
        path: "/customers",
        name: "customers",
        component: ServicesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allcustomers",
            component: AllCustomers,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "services index",
                subject: "services",
              },
            },
          },
          {
            path: "create",
            name: "Createcustomers",
            component: CreateCustomers,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "customers create",
                subject: "customers",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editcustomers",
            component: EditCustomers,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "customers edit",
                subject: "customers",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showcustomers",
            component: ShowCustomers,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "customers show",
                subject: "customers",
              },
            },
          },
        ],
      },
        // End:: customers Config

      // Start:: reasons  Config
      // {
      //   path: "/reasons",
      //   name: "reasons",
      //   component: ReasonsHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "Allreasons",
      //       component: AllReasons,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "reasons index",
      //           subject: "reasons",
      //         },
      //       },
      //     },
      //     {
      //       path: "create",
      //       name: "Createreasons",
      //       component: CreateReasons,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "reasons create",
      //           subject: "reasons",
      //         },
      //       },
      //     },
      //     {
      //       path: "edit/:id",
      //       name: "Editreasons",
      //       component: EditReasons,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "reasons edit",
      //           subject: "reasons",
      //         },
      //       },
      //     },
      //     {
      //       path: "show/:id",
      //       name: "Showreasons",
      //       component: ShowReasons,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "reasons show",
      //           subject: "reasons",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: reasons Config

      // Start:: workplaces  Config
      // {
      //   path: "/workplaces",
      //   name: "workplaces",
      //   component: WorkplacesHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "Allworkplaces",
      //       component: AllWorkplaces,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "workplaces index",
      //           subject: "workplaces",
      //         },
      //       },
      //     },
      //     {
      //       path: "create",
      //       name: "Createworkplaces",
      //       component: CreateWorkplaces,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "workplaces create",
      //           subject: "workplaces",
      //         },
      //       },
      //     },
      //     {
      //       path: "edit/:id",
      //       name: "Editworkplaces",
      //       component: EditWorkplaces,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "workplaces edit",
      //           subject: "workplaces",
      //         },
      //       },
      //     },
      //     {
      //       path: "show/:id",
      //       name: "Showworkplaces",
      //       component: ShowWorkplaces,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "workplaces show",
      //           subject: "workplaces",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: workplaces Config

      // Start:: WalletRequests  Config
      // {
      //   path: "/request-wallets",
      //   name: "RequestWallets",
      //   component: RequestWalletsHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "AllRequestWallets",
      //       component: AllRequestWallets,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "withdraw_requests index",
      //           subject: "withdraw_requests",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: WalletRequests Config

      // start::designers orders
      // {
      //   path: "/joinClients",
      //   name: "ClientRequestsHome",
      //   component: ClientRequestsHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "AllClientRequests",
      //       component: AllClientRequests,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "clients index",
      //           subject: "clients",
      //         },
      //       },
      //     },

      //     {
      //       path: "show/:id",
      //       name: "ShowClientRequests",
      //       component: ShowClientRequests,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "clients show",
      //           subject: "clients",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End::designers orders

      // start::user requests
      {
        path: "/influencers-requests",
        name: "UserRequestsHome",
        component: UserRequestsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllUserRequests",
            component: AllUserRequests,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "acceptedproviders index",
                subject: "acceptedproviders",
              },
            }},
          {
            path: "show/:id",
            name: "ShowUserRequests",
            component: ShowUserRequests,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "acceptedproviders show",
                subject: "acceptedproviders",
              },
            },
          },
        ],
      },
      // End::user requests

      // Start:: WalletHistory  Config
      // {
      //   path: "/WalletHistory",
      //   name: "WalletHistory",
      //   component: WalletHistoryHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all/:id",
      //       name: "AllWalletHistory",
      //       component: AllWalletHistory,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "users index",
      //           subject: "users",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: WalletHistory Config

      // Start:: Influencers  Config
      {
        path: "/influencers",
        name: "influencers",
        component: InfluencersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllInfluencers",
            component: AllInfluencers,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "influencers index",
                subject: "influencers",
              },
            },
          },
          {
            path: "create",
            name: "CreateInfluencers",
            component: CreateInfluencers,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "influencers create",
                subject: "influencers",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditInfluencers",
            component: EditInfluencers,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "influencers edit",
                subject: "influencers",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowInfluencers",
            component: ShowInfluencers,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "influencers show",
                subject: "influencers",
              },
            },
          },
          {
            path: "show-accounts/:id",
            name: "ShowInfluencersAccounts",
            component: ShowInfluencersAccounts,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "influencers show",
                subject: "influencers",
              },
            },
          },
        ],
      },
      // End:: Influencers Config

      // Start:: Blogs  Config
      {
        path: "/blogs",
        name: "blogs",
        component: BlogsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllBlogs",
            component: AllBlogs,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "blogs index",
                subject: "blogs",
              },
            },
          },
          {
            path: "create",
            name: "CreateBlogs",
            component: CreateBlogs,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "blogs create",
                subject: "blogs",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditBlogs",
            component: EditBlogs,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "blogs edit",
                subject: "blogs",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowBlogs",
            component: ShowBlogs,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "blogs show",
                subject: "blogs",
              },
            },
          },
        ],
      },
      // End:: Blogs Config

      // Start:: banks  Config
      {
        path: "/banks",
        name: "banks",
        component: BanksHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allbanks",
            component: AllBanks,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "banks index",
                subject: "banks",
              },
            },
          },
          {
            path: "create",
            name: "Createbanks",
            component: CreateBanks,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "banks create",
                subject: "banks",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editbanks",
            component: EditBanks,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "banks edit",
                subject: "banks",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showbanks",
            component: ShowBanks,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "banks show",
                subject: "banks",
              },
            },
          },
        ],
      },
      // End:: banks Config

      // Start:: Auctions  Config
      {
        path: "/auctions",
        name: "auctions",
        component: AuctionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allauctions",
            component: AllAuctions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "auctions index",
                subject: "auctions",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showauctions",
            component: ShowAuctions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "auctions show",
                subject: "auctions",
              },
            },
          },
        ],
      },
      // End:: Auctions Config

      // Start:: packages  Config
      {
        path: "/packages",
        name: "packages",
        component: PackagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allpackages",
            component: AllPackages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "packages index",
                subject: "packages",
              },
            },
          },
          {
            path: "create",
            name: "Createpackages",
            component: CreatePackages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "packages create",
                subject: "packages",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editpackages",
            component: EditPackages,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "packages edit",
                subject: "packages",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showpackages",
            component: ShowPackages,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "packages show",
                subject: "packages",
              },
            },
          },
        ],
      },
      // End:: packages Config

      // Start:: durations  Config
      {
        path: "/durations",
        name: "durations",
        component: DurationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Alldurations",
            component: AllDurations,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "auctiondurations index",
                subject: "auctiondurations",
              },
            },
          },
          {
            path: "create",
            name: "Createdurations",
            component: CreateDurations,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "auctiondurations create",
                subject: "auctiondurations",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editdurations",
            component: EditDurations,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "auctiondurations edit",
                subject: "auctiondurations",
              },
            },
          },
          {
            path: "show/:id",
            name: "Showdurations",
            component: ShowDurations,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "auctiondurations show",
                subject: "auctiondurations",
              },
            },
          },
        ],
      },
      // End:: durations Config

      // Start:: ads  Config
      {
        path: "/ads",
        name: "ads",
        component: AdsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAds",
            component: AllAds,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisements index",
                subject: "advertisements",
              },
            },
          },
          {
            path: "create",
            name: "CreateAds",
            component: CreateAds,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisements create",
                subject: "advertisements",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAds",
            component: EditAds,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisements edit",
                subject: "advertisements",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAds",
            component: ShowAds,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisements show",
                subject: "advertisements",
              },
            },
          },
        ],
      },
      // End:: ads Config

      // Start: Splash Config
      {
        path: "/splash",
        name: "splash",
        component: SplashHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllSplash",
            component: AllSplash,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "openingscreens index",
                subject: "openingscreens",
              },
            },
          },
          {
            path: "create",
            name: "CreateSplash",
            component: CreateSplash,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "openingscreens create",
                subject: "openingscreens",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditSplash",
            component: EditSplash,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "openingscreens edit",
                subject: "openingscreens",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowSplash",
            component: ShowSplash,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "openingscreens show",
                subject: "openingscreens",
              },
            },
          },
        ],
      },
      // End:: Splash Config

      // Start:: All Notifications Route Config
      {
        path: "/all-notifications",
        name: "NotificationsHome",
        component: NotificationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllNotifications",
            component: AllNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications index",
                subject: "notifications",
              },
            },
          },
          {
            path: "create",
            name: "CreateNotificationss",
            component: CreateNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications create",
                subject: "notifications",
              },
            },
          },
          {
            path: "show",
            name: "ShowAllNotifications",
            component: ShowAllNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications index",
                subject: "notifications",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowNotificationss",
            component: ShowNotificationsTable,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications index",
                subject: "notifications",
              },
            },
          },
        ],
      },
      // End:: All Notifications Route Config

      // Start:: Clients Routes Config
      {
        path: "/Clients",
        name: "ClientsHome",
        component: ClientsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllClients",
            component: AllClients,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users index",
                subject: "users",
              },
            },
          },
          // {
          //   path: "create",
          //   name: "CreateClients",
          //   component: CreateClients,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "users create",
          //       subject: "users",
          //     },
          //   },
          // },
          // {
          //   path: "edit/:id",
          //   name: "EditClients",
          //   component: EditClients,
          //   props: true,
          //   meta: {
          //     middleware: [auth],
          //     requiresPermission: {
          //       action: "users edit",
          //       subject: "users",
          //     },
          //   },
          // },
          {
            path: "show/:id",
            name: "ShowClients",
            component: ShowClients,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "users show",
                subject: "users",
              },
            },
          },
        ],
      },
      // End:: Clients Routes Config

      // Start:: Providers Routes Config
      {
        path: "/Providers",
        name: "ProvidersHome",
        component: ProvidersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllProviders",
            component: AllProviders,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers index",
                subject: "providers",
              },
            },
          },
          {
            path: "create",
            name: "CreateProviders",
            component: CreateProviders,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers create",
                subject: "providers",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditProviders",
            component: EditProviders,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers edit",
                subject: "providers",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowProviders",
            component: ShowProviders,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "providers show",
                subject: "providers",
              },
            },
          },
        ],
      },
      // End:: Providers Routes Config

      // Start:: Order requests config
      // {
      //   path: "/order-requests",
      //   name: "OrdersRequestsHome",
      //   component: OrdersRequestsHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "AllOrdersRequests",
      //       component: AllOrdersRequests,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "users index",
      //           subject: "users",
      //         },
      //       },
      //     },
      //     {
      //       path: "show/:id",
      //       name: "ShowOrdersRequests",
      //       component: ShowOrdersRequests,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "users index",
      //           subject: "users",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: Order requests config

      // Start:: questions Routes Config
      {
        path: "/questions",
        name: "questionsHome",
        component: questionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allquestions",
            component: Allquestions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions index",
                subject: "questions",
              },
            },
          },
          {
            path: "create",
            name: "Createquestions",
            component: Createquestions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions create",
                subject: "questions",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editquestions",
            component: Editquestions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions edit",
                subject: "questions",
              },
            },
          },
        ],
      },
      // End:: questions Routes Config

      // Start:: Categories Routes Config
      {
        path: "/main-categories",
        name: "CategoriesHome",
        component: CategoriesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCategories",
            component: AllCategories,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
          {
            path: "create",
            name: "CreateCategories",
            component: CreateCategories,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditCategories",
            component: EditCategories,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowCategories",
            component: ShowCategories,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "categories index",
                subject: "categories",
              },
            },
          },
        ],
      },
      // End:: Categories Routes Config

      // Start:: app-rates Routes Config
      {
        path: "/app-rate",
        name: "AppRatesHome",
        component: AppRatesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAppRates",
            component: AllAppRates,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "rates index",
                subject: "rates",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAppRates",
            component: ShowAppRates,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "rates show",
                subject: "rates",
              },
            },
          },
        ],
      },
      // End:: app-rates Routes Config

      // Start:: referral-providers-codes Routes Config
      {
        path: "/referral-providers-codes",
        name: "ReferralProvidersCodesHome",
        component: ReferralCodesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllReferralProvidersCodes",
            component: AllReferralCodes,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "referralprovidercodes index",
                subject: "referralprovidercodes",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowReferralProvidersCodes",
            component: ShowReferralCodes,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "referralprovidercodes show",
                subject: "referralprovidercodes",
              },
            },
          },
        ],
      },
      // End:: referral-providers-codes Routes Config

      // Start:: orders-and-quotations Routes Config
      {
        path: "/orders-and-quotations",
        name: "OrdersAndQuotationsHome",
        component: OrdersAndQuotationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOrdersAndQuotations",
            component: AllOrdersAndQuotations,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "orders index",
                subject: "orders",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowOrdersAndQuotations",
            component: ShowOrdersAndQuotations,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "orders show",
                subject: "orders",
              },
            },
          },
        ],
      },
      // End:: orders-and-quotations Routes Config

      // Start:: app-rates Routes Config
      // {
      //   path: "/store-rate",
      //   name: "StoreRatesHome",
      //   component: StoreRatesHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "AllStoreRates",
      //       component: AllStoreRates,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "rates index",
      //           subject: "rates",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: app-rates Routes Config

      // Start:: sub Categories Routes Config
      {
        path: "/sub-categories",
        name: "CategoriesHome",
        component: SubCategoriesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllSubCategories",
            component: AllSubCategories,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subcategories index",
                subject: "subcategories",
              },
            },
          },
          {
            path: "create",
            name: "CreateSubCategories",
            component: CreateSubCategories,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subcategories index",
                subject: "subcategories",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditSubCategories",
            component: EditSubCategories,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowSubCategories",
            component: ShowSubCategories,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subcategories index",
                subject: "subcategories",
              },
            },
          },
        ],
      },
      // End:: sub Categories Routes Config

      // Start:: sub Categories Questions Routes Config
      {
        path: "/sub-categories-questions",
        name: "SubCategoriesQuestionsHome",
        component: SubCategoriesQuestionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all/:id",
            name: "AllSubCategoriesQuestions",
            component: AllSubCategoriesQuestions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subcategoryquestions index",
                subject: "subcategoryquestions",
              },
            },
          },
          {
            path: "create",
            name: "CreateSubCategoriesQuestions",
            component: CreateSubCategoriesQuestions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subcategoryquestions create",
                subject: "subcategoryquestions",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditSubCategoriesQuestions",
            component: EditSubCategoriesQuestions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subcategoryquestions edit",
                subject: "subcategoryquestions",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowSubCategoriesQuestions",
            component: ShowSubCategoriesQuestions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subcategoryquestions show",
                subject: "subcategoryquestions",
              },
            },
          },
          {
            path: "sub-categories",
            name: "SubCategories",
            component: SubCategories,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subcategoryquestions index",
                subject: "subcategoryquestions",
              },
            },
          },
        ],
      },
      // End:: sub Categories Questions Routes Config

      

      // Start:: management Routes Config
      // {
      //   path: "/managements",
      //   name: "ManagementsHome",
      //   component: ManagementsHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "AllManagements",
      //       component: AllManagements,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "management index",
      //           subject: "management",
      //         },
      //       },
      //     },
      //     {
      //       path: "create",
      //       name: "CreateManagements",
      //       component: CreateManagements,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "management index",
      //           subject: "management",
      //         },
      //       },
      //     },
      //     {
      //       path: "edit/:id",
      //       name: "EditManagements",
      //       component: EditManagements,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //       },
      //     },
      //     {
      //       path: "show/:id",
      //       name: "ShowManagements",
      //       component: ShowManagements,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "management index",
      //           subject: "management",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: management Routes Config

      // Start:: Capacities  Config
      // {
      //   path: "/Capacities",
      //   name: "CapacitiesHome",
      //   component: CapacitiesHome,
      //   meta: {
      //     middleware: [auth],
      //   },
      //   children: [
      //     {
      //       path: "all",
      //       name: "AllCapacitiesHome",
      //       component: AllCapacities,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "capacities index",
      //           subject: "capacities",
      //         },
      //       },
      //     },
      //     {
      //       path: "create",
      //       name: "CreateCapacities",
      //       component: CreateCapacities,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "capacities create",
      //           subject: "capacities",
      //         },
      //       },
      //     },
      //     {
      //       path: "edit/:id",
      //       name: "EditCapacities",
      //       component: EditCapacities,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "capacities edit",
      //           subject: "capacities",
      //         },
      //       },
      //     },
      //     {
      //       path: "show/:id",
      //       name: "ShowCapacities",
      //       component: ShowCapacities,
      //       props: true,
      //       meta: {
      //         middleware: [auth],
      //         requiresPermission: {
      //           action: "capacities show",
      //           subject: "capacities",
      //         },
      //       },
      //     },
      //   ],
      // },
      // End:: Capacities Config

      // Start:: App contact Routes Config
      {
        path: "/contact_settings",
        component: GeneralSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings create",
            subject: "settings",
          },
        },
      },
      {
        path: "/app_settings",
        component: AppSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings edit",
            subject: "settings",
          },
        },
      },
      // End:: App contact Routes Config
    ],
  },
  // ***************** End:: Content Routes Config

  // ***************** Start:: Forbidden Route Config
  {
    path: "/forbidden",
    name: "ForbiddenPage",
    component: ForbiddenPage,
  },
  // ***************** End:: Forbidden Route Config

  // ***************** Start:: Not Found Route Config
  {
    path: "/:notFound(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
  // ***************** End:: Not Found Route Config
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
  routes,
});

// Start:: Middleware And Router Guards
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

// Authentication and Permission Check Middleware
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem(
    "drzn_admin_dashboard_user_token"
  );

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = { from, next, router, to };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  } else if (isAuthenticated) {
    const publicRoutes = [
      "LoginForm",
      "ResetPasswordEmailForm",
      "PhoneVerification",
      "ChangePhoneNumberForm",
      "ResetPasswordForm",
    ];

    if (publicRoutes.includes(to.name)) {
      return next("/home");
    }
  }

  if (to.meta.requiresPermission) {
    const { action, subject } = to.meta.requiresPermission;
    let abilityCombos = [];

    const storedAbility = localStorage.getItem(
      "drzn_admin_dashboard_user_ability"
    );

    if (storedAbility) {
      try {
        abilityCombos = JSON.parse(storedAbility) || [];
      } catch (error) {
        abilityCombos = [];
      }
    }

    if (!abilityCombos.length) {
      try {
        const storedPermissions =
          JSON.parse(localStorage.getItem("drzn_admin_roles"))?.permissions ||
          [];
        abilityCombos = mapPermissionsToAbilityCombos(storedPermissions);
      } catch (error) {
        abilityCombos = [];
      }
    }

    if (
      abilityCombos.some(
        (combo) => combo.name === name && combo.subject === subject
      )
    ) {
      return next();
    } else {
      return next("/forbidden");
    }
  }

  return next();
});

export default router;
