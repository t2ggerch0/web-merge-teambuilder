import React, { FC, useState, useEffect } from "react";
import styles from "./ManageProject.module.scss";
import { ClassType, Menu, UserTypeType } from "../../interface";
import Class from "./Class/Class";
import CodePopUp from "../../Components/CodePopUp/CodePopUp";
import Layout from "../../Components/Layout/Layout";
import { api } from "../../API/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/UnicoopContext";
import EditProject from "./EditProject/EditProject";

type ManageProjectProps = {
  something?: string;
  userType?: UserTypeType;
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const ManageProject: FC<ManageProjectProps> = ({
  something,
  selectedMenu,
  onChangeMenu,
  userType = "student",
}) => {
  const navigation = useNavigate();
  const userInfoHandle = useAuthContext();
  const dummyClassId = userInfoHandle.myInfo?.classes ?? [];
  const [isPopOn, setIsPopOn] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [currentClass, setCurrentClass] = useState<ClassType | undefined>(
    undefined
  );
  const [classes, setClasses] = useState<ClassType[]>([]);
  const onChangeCode = (newCode: string) => {
    setCode(newCode);
  };
  const onClickModal = () => {
    setIsPopOn(!isPopOn);
  };

  const getClassesInfoAll = async () => {
    if (userInfoHandle.myInfo) {
    }
  };
  const onClickClass = (classId?: string) => {
    setCurrentClass(classes.find((item) => item?.id === classId));
  };

  const onFinishEditQuestion = (classId?: string) => {
    if (classId && userInfoHandle.myInfo?.token) {
      api.endQuestion({
        token: userInfoHandle.myInfo?.token,
        classId,
      });
    }
  };

  useEffect(() => {
    let token = window.localStorage.getItem("token") ?? "";
    console.log("token", token);

    api
      .getUserInfoByToken(token)
      .then((res) => {
        console.log("res", res.user);
        userInfoHandle.setMyInfo({
          userType: res?.user.userType ?? "student",
          classes: res?.user.classes ?? [],
          email: res?.user.email ?? "",
          id: res?.user?._id ?? "",
          major: res?.user.major ?? "",
          name: res?.user.name ?? "",
          password: res?.user.password ?? "",
          studentId: res?.user.studentId ?? -1,
          token,
        });
        return res.user.classes as string[];
      })
      .then(async (classes) => {
        const result = await Promise.all(
          classes.map((id) => {
            return api.getClassInfo(id).then((res) => {
              return res as ClassType;
            });
          })
        );
        setClasses(result);
      });
  }, []);

  return (
    <Layout
      pageTitle={"프로젝트 관리"}
      selectedMenu={selectedMenu}
      onChangeMenu={onChangeMenu}>
      <div className={styles.container}>
        <div className={styles.btn_wrapper}>
          {userInfoHandle.myInfo?.userType === "student" && (
            <button className={styles.btn} onClick={onClickModal}>
              "프로젝트 입장하기"
            </button>
          )}
        </div>

        <div
          className={`${currentClass === undefined && styles.class_container}`}>
          {currentClass === undefined ? (
            classes.map((item, index) => {
              return (
                <Class
                  key={`class_${item?.id}`}
                  classInfo={item}
                  order={index}
                  onClickClass={onClickClass}
                />
              );
            })
          ) : (
            <EditProject
              classInfo={currentClass}
              onClickClass={onClickClass}
              onFinishEditQuestion={onFinishEditQuestion}
            />
          )}
        </div>

        {isPopOn && <CodePopUp isPopOn={isPopOn} setIsPopOn={setIsPopOn} />}
      </div>
    </Layout>
  );
};

export default ManageProject;
