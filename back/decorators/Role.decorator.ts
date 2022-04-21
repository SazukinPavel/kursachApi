import { SetMetadata} from "@nestjs/common"
import { RoleKey, RoleType } from "src/types/RoleType"

export const Role=(role:RoleType)=>SetMetadata(RoleKey,role)
