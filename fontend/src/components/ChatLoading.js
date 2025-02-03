import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from "./ui/skeleton";
import { HStack, Stack } from "@chakra-ui/react";

const ChatLoading = () => {
  return <SkeletonText height="20" noOfLines={10} gap="4" />;
};

export default ChatLoading;
