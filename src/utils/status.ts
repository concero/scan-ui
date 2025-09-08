import { Status } from "@/types";

type ValidateStatusParameter = {
  status?: Status | undefined;
};

export const parseStatus = (v: string | null | undefined): Status | undefined => {
  if (!v) return undefined;
  return v in Status ? (Status as any)[v] : undefined;
};

export const validateStatus = ({ status }: ValidateStatusParameter): boolean =>
  status === undefined || Object.values(Status).includes(status);