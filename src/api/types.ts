
export enum ApiEndpoints {
  LIST_LOCAL_MODELS = "/api/tags",
  LIST_RUNNING_MODLES = "/api/ps",
  COMPLETION = "/api/generate",
  CHAT = "/api/chat",
}

export type ApiResponse = {
  Error: boolean,
  Message: string,
  Data: any
}
// api middleware types
export type RequestMiddleware = (request: RequestInit, url: string) => Promise<void>;
export type ResponseMiddleware = (response: Response, url: string) => Promise<Response>;

// Define the Options type
export interface Options {
  seed?: number;
  temperature?: number;
  num_ctx?: number;
}

// Define GenerateCompletionReq
export interface GenerateCompletionReq {
  model: string;
  prompt: string;
  stream: boolean;
  suffix?: string;
  image?: string[];
  format?: string;
  system?: string;
  raw?: boolean;
  options?: Options;
  keep_alive?: string;
}

// Define GenerateCompletionRes
export interface GenerateCompletionRes {
  model: string;
  response: string;
  done: boolean;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
  total_duration: number;
  load_duration: number;
}

export type Role = "system" | "user" | "assistant" | "tool";

// Define Message type
export interface Message {
  // feilds comming from api
  role: Role;
  content: string;
  image?: string[];
  tool_calls?: string[];
  // feilds defined in frontend
  creator: string;
  created_at: number;
  updated_at: number;
}

// Define GenerateChatCompletionReq
export interface GenerateChatReq {
  model: string;
  messages: Message[];
  tools?: string[];
  format?: string;
  stream: boolean;
  keep_alive?: number;
}

// Define GenerateChatCompletionRes
export interface GenerateChatRes {
  model: string;
  created_at: string;
  message: Message;
  done: boolean;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
  total_duration: number;
  load_duration: number;
}

// Define LoadModelRes
export interface LoadModelRes {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

// Define UnloadModelRes
export interface UnloadModelRes {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  done_reason: string;
}

// Define RunningModel
export interface RunningModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: Details;
  expire_at: string;
  size_vram: number;
}

// Define LocalModel
export interface LocalModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: Details;
}

// Define Details
export interface Details {
  format: string;
  family: string;
  families?: string[]; // Handle nullable values
  parameter_size?: string;
  quantization_level?: string;
}

// Define ListRunningModelsRes
export interface ListRunningModelsRes {
  models: RunningModel[];
}

// Define ListLocalModelsRes
export interface ListLocalModelsRes {
  models: LocalModel[];
}

// Define CompletionSSERes
export interface CompletionSSERes {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  done_reason?: string;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

// Define ChatCompletionSSERes
export interface ChatCompletionSSERes {
  model: string;
  created_at: string;
  done: boolean;
  message: Message;
  total_duration?: number;
  load_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}



// types that use for persistant state
export interface Conversation {
  id: string;
  title: string;
  messages: Message[]
  created_at: number;
  updated_at: number;
  system?: string;
  temperature?: number;
  seed?: string;
}


export interface SolutionType {
  id: number;
  title: string;
  content: string;
  created_at: number;
}
