import React, { useState } from "react";
import {
  AiOutlineBgColors,
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaBloggerB, FaClipboardList } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [close, setClose] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      <Layout>
        <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
          <div className="p-5 w-15 bg-slate-500 mt-6" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key == "signup") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <AiOutlineDashboard />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <AiOutlineUser />,
                label: "Customers",
              },
              {
                key: "homepage",
                icon: <IoHomeOutline />,
                label: "Home Page",
                children: [
                  {
                    key: "addhomedetails",
                    icon: <AiOutlineShoppingCart className="text-[14px]" />,
                    label: "Add Details",
                  },
                  {
                    key: "homedetailslist",
                    icon: <AiOutlineShoppingCart className="text-[14px]" />,
                    label: "Home Details list",
                  },
                ],
              },
              {
                key: "Catalog",
                icon: <AiOutlineShoppingCart />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    icon: <AiOutlineShoppingCart className="text-[14px]" />,
                    label: "Add Product",
                  },
                  {
                    key: "list-product",
                    icon: <AiOutlineShoppingCart className="text-[14px]" />,
                    label: "Product List",
                  },
                  {
                    key: "brand",
                    icon: <SiBrandfolder className="text-[14px]" />,
                    label: "Brand",
                  },
                  {
                    key: "list-brand",
                    icon: <SiBrandfolder className="text-[14px]" />,
                    label: "Brand List ",
                  },
                  {
                    key: "category",
                    icon: <BiCategoryAlt className="text-[14px]" />,
                    label: "Category",
                  },
                  {
                    key: "list-category",
                    icon: <BiCategoryAlt className="text-[14px]" />,
                    label: "Category List",
                  },
                  {
                    key: "color",
                    icon: <AiOutlineBgColors className="text-[14px]" />,
                    label: "Color",
                  },
                  {
                    key: "list-color",
                    icon: <AiOutlineBgColors className="text-[14px]" />,
                    label: "Color List",
                  },
                ],
              },
              {
                key: "orders",
                icon: <FaClipboardList className="fs-4" />,
                label: "Orders",
              },
              {
                key: "blogs",
                icon: <FaBloggerB className="fs-4" />,
                label: "Blogs",
                children: [
                  {
                    key: "blog",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog",
                  },
                  {
                    key: "blog-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog List",
                  },
                  {
                    key: "blog-category",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog Category List",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <FaClipboardList className="fs-4" />,
                label: "Enquiries",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="flex justify-between items-center ps-1 pe-5 min-h-[50px]"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <div className="flex gap-3 pe-10 items-center text-white">
              <div className="relative flex">
                <IoIosNotifications className="text-4xl" />
                <span className="bg-orange-400 flex-initial leading-none rounded-full p-1 z-10 absolute top-0 right-3 me-[-10px]">
                  3
                </span>
              </div>

              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>
              <div
                className="relative cursor-pointer"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => setClose(!close)}
              >
                <h5 className="leading-5"> Krishna</h5>
                <p className="leading-5">krishna@gmail.com</p>
              </div>
              <div
                className={
                  close
                    ? "hidden"
                    : "absolute bg-black list-none top-20 w-[150px] py-2 px-3  z-20"
                }
                // className="absolute bg-black list-none top-20 w-[150px] py-2 px-3  z-20"
                aria-labelledby="dropdownMenuLink"
              >
                <Link
                  className="py-1 mb-1 no-underline text-center text-white"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="/"
                >
                  <li className="py-2 px-3">View Profile</li>
                </Link>
                <Link
                  className="py-1 mb-1 no-underline text-center text-white"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="/"
                >
                  <li className="py-2 px-3">Signout</li>
                </Link>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
