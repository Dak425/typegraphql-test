import { UserResolver } from './UserResolver';
import { InventoryResolver } from './InventoryResolver';
import { ImageResolver } from './ImageResolver';
import { ViewerResolver } from './modules/ViewerResolver';
import { LoginResolver } from './modules/LoginResolver';
import { LogoutResolver } from './modules/LogoutResolver';
import { RegisterResolver } from './modules/RegisterResolver';

export const resolvers = [
  UserResolver,
  InventoryResolver,
  ImageResolver,
  ViewerResolver,
  LoginResolver,
  LogoutResolver,
  RegisterResolver
];
