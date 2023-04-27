import React, { FC } from "react";
import DatePicker from "react-datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ko } from "date-fns/esm/locale";
import styles from "./ClassInfo.module.scss";
import LabelInput from "../../../Components/LabelInput/LabelInput";
import { ProjectRegisterInfo } from "../../../interface";

type ClassInfoProps = {
  projectRegisterInfo: ProjectRegisterInfo;
  onChangeClassInfo({ name, value }: { name: string; value: string }): void;
};

const ClassInfo: FC<ClassInfoProps> = ({
  projectRegisterInfo,
  onChangeClassInfo,
}) => {
  const { capacity, className, endDate, startDate } = projectRegisterInfo;
  const onChangeInfo = (name: string, value: string) => {
    onChangeClassInfo({ name, value });
  };
  const onChangeStartDate = (newDate: Date) => {
    onChangeClassInfo({ name: "startDate", value: newDate.toISOString() });
  };

  const onChangeEndDate = (newDate: Date) => {
    onChangeClassInfo({ name: "endDate", value: newDate.toISOString() });
  };
  return (
    <div>
      <hr />
      <div>수업 정보를 입력해주세요</div>
      <LabelInput
        className={styles.label}
        title="수업명"
        name="className"
        placeholder="수업명"
        width={500}
        value={className}
        onChange={(value) => onChangeInfo("className", value)}
      />

      <LabelInput
        className={styles.label}
        title="정원"
        name="capacity"
        placeholder="00명"
        width={500}
        value={capacity}
        onChange={(value) => onChangeInfo("capacity", value)}
      />

      <div className={styles.duration}>
        <span className={styles.duration_label}>기간</span>
        <div className={styles.datepicker_container}>
          <DatePicker
            className={styles.datepicker}
            locale={ko}
            dateFormat={"yyyy.MM.dd"}
            onChange={onChangeStartDate}
            selected={new Date(startDate)}
          />
        </div>
        <CalendarMonthIcon className={styles.calender} />
        <span className={styles.text}>~</span>
        <div className={styles.datepicker_container}>
          <DatePicker
            className={`${styles.datepicker} ${styles.datepicker_2}`}
            locale={ko}
            dateFormat={"yyyy.MM.dd"}
            selected={new Date(endDate)}
            onChange={onChangeEndDate}
          />
        </div>
        <CalendarMonthIcon className={styles.calender_2} />
      </div>
    </div>
  );
};

export default ClassInfo;
