export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  address: "Address",
  password: "Password",
  idConfirmation: "Upload your ID (file upload)",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  address: "text",
  password: "password",
};

export const FIELD_PLACEHOLDERS = {
  fullName: "First and last name",
  email: "Your email address",
  address: "Full address and postcode",
  password: "At least 8 characters",
  idConfirmation: "Upload your ID (file upload)",
};

export const adminSideBarLinks = [
  { icon: "house", route: "/admin", text: "Home" },
  { icon: "users-round", route: "/admin/users", text: "All Users" },
  { icon: "drill", route: "/admin/items", text: "All Items" },
  { icon: "clipboard-clock", route: "/admin/item-requests", text: "Borrow Requests" },
  { icon: "user-round", route: "/admin/account-requests", text: "Account Requests" },
];
