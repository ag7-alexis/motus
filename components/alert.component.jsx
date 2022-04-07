import React, { FC } from "react";
import { AlertType } from "../types/Alert";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';


export const AlertComponent = ({ alert }) => {
  if (!alert || !alert.message) {
    return null;
  }

  function getAlertClass() {
    switch (alert?.type) {
      case AlertType.Error:
        return "error";
      case AlertType.Warning:
        return "warning";
      case AlertType.Success:
        return "success";
    }

    return null;
  }
  return <Alert status={getAlertClass()} variant='subtle'>
    <AlertIcon />
    {alert?.message}
  </Alert>
};
