import { SetMetadata} from "@nestjs/common"
import { RoleKey, RoleParam} from "src/types/RoleType"

export const Role=(role:RoleParam[])=>SetMetadata(RoleKey,role)
