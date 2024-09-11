/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HProject } from './hProject';
import { HyperIoTBaseEntity } from './hyperIoTBaseEntity';
import { RootRuleNode } from './rootRuleNode';
import { RuleAction } from './ruleAction';


export interface Rule {
    id?: number;
    entityVersion: number;
    readonly entityCreateDate?: Date;
    readonly entityModifyDate?: Date;
    name?: string;
    description?: string;
    ruleDefinition?: string;
    rulePrettyDefinition?: string;
    project?: HProject;
    readonly packetIds?: string;
    jsonActions?: string;
    actions?: Array<RuleAction>;
    type?: Rule.TypeEnum;
    rule?: RootRuleNode;
    parent?: HyperIoTBaseEntity;
    tagIds?: Array<number>;
}
export namespace Rule {
    export type TypeEnum = 'ENRICHMENT' | 'EVENT' | 'ALARM_EVENT';
    export const TypeEnum = {
        ENRICHMENT: 'ENRICHMENT' as TypeEnum,
        EVENT: 'EVENT' as TypeEnum,
        ALARMEVENT: 'ALARM_EVENT' as TypeEnum
    };
}
