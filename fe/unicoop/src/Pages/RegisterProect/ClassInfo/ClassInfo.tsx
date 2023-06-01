import React, { FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import styles from "./ClassInfo.module.scss";
import { ProjectRegisterInfo, positionTypes } from "../../../interface";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Add, Delete } from "@mui/icons-material";

type ClassInfoProps = {
  projectRegisterInfo: ProjectRegisterInfo;
  onChangeClassInfo({
    name,
    value,
  }: {
    name: string;
    value:
      | string
      | number
      | string[]
      | number[]
      | Dayjs
      | boolean
      | positionTypes[];
  }): void;
};

const ClassInfo: FC<ClassInfoProps> = ({
  projectRegisterInfo,
  onChangeClassInfo,
}) => {
  const {
    className,
    activityEndDate,
    activityStartDate,
    classDescription,
    hostPosition,
    isHostParticipating,
    isSecret,
    positionTypes,

    recruitEndDate,
    recruitStartDate,
  } = projectRegisterInfo;
  const [newPositionType, setNewPositionType] = useState<string>("");
  const onChangeInfo = (name: string, value: string | Dayjs) => {
    // console.log(name, value);
    onChangeClassInfo({ name, value });
  };

  return (
    <div className={styles.classInfo}>
      <div className={styles.row}>
        <span className={styles.label}>프로젝트 이름</span>
        <TextField
          required
          value={className}
          onChange={(e) => {
            onChangeInfo("className", e.target.value.toString());
          }}
          label="프로젝트 이름"
          variant="standard"
        />
      </div>

      <div className={styles.row}>
        <span className={styles.label}>프로젝트 설명</span>
        <TextField
          label="프로젝트 설명"
          multiline
          rows={4}
          fullWidth
          className={styles.description}
          variant="outlined"
          defaultValue="프로젝트 설명"
          value={classDescription}
          onChange={(e) => {
            onChangeInfo("classDescription", e.target.value.toString());
          }}
        />
      </div>

      <FormControl>
        <div className={styles.row}>
          <FormLabel className={styles.label}>프로젝트 공개</FormLabel>
          <RadioGroup
            row
            defaultValue={isSecret ? "비공개" : "공개"}
            onChange={() => {
              onChangeClassInfo({ name: "isSecret", value: !isSecret });
            }}>
            <FormControlLabel value="공개" control={<Radio />} label="공개" />
            <FormControlLabel
              value="비공개"
              control={<Radio />}
              label="비공개"
            />
          </RadioGroup>
        </div>
      </FormControl>

      <div className={styles.positionForm}>
        <div className={styles.row}>
          <span className={styles.label}>포지션 유형</span>
          <div className={styles.positionList}>
            {positionTypes.map((position) => (
              <div className={styles.position_type}>
                <TextField
                  contentEditable={false}
                  className={styles.label}
                  value={position.typeName}
                  variant="outlined"
                />
                <Button
                  className={styles.button}
                  variant="text"
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => {
                    let newPositionType = positionTypes.filter(
                      (data) => data.typeName !== position.typeName
                    );
                    onChangeClassInfo({
                      name: "positionTypes",
                      value: newPositionType,
                    });
                  }}>
                  삭제
                </Button>
              </div>
            ))}
            <div className={styles.position_type}>
              <TextField
                className={styles.label}
                value={newPositionType}
                onChange={(e) => setNewPositionType(e.target.value)}
                placeholder="유형 추가"
                variant="outlined"
              />
              <Button
                className={styles.button}
                variant="text"
                size="small"
                color="secondary"
                startIcon={<Add />}
                onClick={() => {
                  onChangeClassInfo({
                    name: "positionTypes",
                    value: [
                      ...positionTypes,
                      { typeName: newPositionType, composition: 1 },
                    ],
                  });

                  setNewPositionType("");
                }}>
                추가
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>포지션 구성</div>
        {positionTypes.map((position) => (
          <TextField
            label={position.typeName}
            className={styles.position_composition}
            value={position.composition}
            onChange={(e) => {
              let newComposition: positionTypes[] = positionTypes.map(
                (data) => {
                  if (data.typeName === position.typeName) {
                    return {
                      ...data,
                      composition: Number(e.target.value),
                    };
                  } else {
                    return data;
                  }
                }
              );
              onChangeClassInfo({
                name: "positionTypes",
                value: newComposition,
              });
            }}
            placeholder="유형 추가"
            variant="outlined"
          />
        ))}
      </div>

      <div className={styles.host_participation}>
        <span className={styles.label}>호스트 참여</span>
        <Checkbox
          checked={isHostParticipating}
          onChange={() =>
            onChangeClassInfo({
              name: "isHostParticipating",
              value: !isHostParticipating,
            })
          }
        />
        {isHostParticipating && (
          <Box sx={{ maxWidth: 120, minWidth: 100 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                호스트 포지션
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="호스트 포지션"
                value={hostPosition}
                onChange={(e: SelectChangeEvent<typeof hostPosition>) => {
                  console.log(e.target);
                  onChangeClassInfo({
                    name: "hostPosition",
                    value: e.target.value as string,
                  });
                }}>
                {positionTypes.map((position) => (
                  <MenuItem value={position.typeName}>
                    {position.typeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </div>

      <div className={styles.duration}>
        <span className={styles.label}>모집 기간</span>
        <div className={styles.datepicker_container}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className={styles.datepicker}
                label="모집시작일"
                value={dayjs(recruitStartDate)}
                onChange={(newValue) =>
                  onChangeClassInfo({
                    name: "recruitStartDate",
                    value: newValue ?? dayjs(new Date()),
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className={styles.datepicker_container}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className={styles.datepicker}
                label="모집마감일"
                value={dayjs(recruitEndDate)}
                onChange={(newValue) =>
                  onChangeClassInfo({
                    name: "recruitEndDate",
                    value: newValue ?? dayjs(new Date()),
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>

      <div className={styles.duration}>
        <span className={styles.label}>활동 기간</span>
        <div className={styles.datepicker_container}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className={styles.datepicker}
                label="활동시작일"
                value={dayjs(activityStartDate)}
                onChange={(newValue) =>
                  onChangeClassInfo({
                    name: "activityStartDate",
                    value: newValue ?? dayjs(new Date()),
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className={styles.datepicker_container}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className={styles.datepicker}
                label="활동마감일"
                value={dayjs(activityEndDate)}
                onChange={(newValue) =>
                  onChangeClassInfo({
                    name: "activityEndDate",
                    value: newValue ?? dayjs(new Date()),
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;
