import AttributeAbstraction from "../types/AttributeAbstraction.js";
import { ModifierOptions, VisibilityOptions } from "../shared/Enums.js";
import MethodAbstraction from "./MethodAbstraction.js";
import InterfaceAbstraction from "./InterfaceAbstraction.js";


export default class ClassAbstraction extends InterfaceAbstraction
{
    protected visibility: VisibilityOptions;
    protected modifier: ModifierOptions;
    protected attributes: AttributeAbstraction[];
    protected herances: ClassAbstraction[] | null;
    protected subTypes: InterfaceAbstraction[] | null;

    public constructor(name: string, methods: MethodAbstraction[], attributes: AttributeAbstraction[], visibility: VisibilityOptions = VisibilityOptions.PUBLIC, option: ModifierOptions = ModifierOptions.CONCRETE, herances: ClassAbstraction[] | null = null, subTypes: InterfaceAbstraction[] | null = null)
    {
        super(name, methods);
        this.attributes = attributes;
        this.visibility = visibility;
        this.modifier = option;
        this.herances = herances;
        this.subTypes = subTypes;
    }

    public getName(): string
    {
        return this.name;
    }

    public getAttributes(): AttributeAbstraction[]
    {
        return this.attributes;
    }

    public getAttributesNames(): string[]
    {
        return this.attributes.map(attr=>attr.getName());
    }

    public getVisibility(): VisibilityOptions
    {
        return this.visibility;
    }

    public getModifier(): ModifierOptions
    {
        return this.modifier;
    }

    public getHerances(): ClassAbstraction[] | null
    {
        return this.herances;
    }

    public getSubTypes(): InterfaceAbstraction[] | null
    {
        return this.subTypes;
    }

    public addHerance(clazz: ClassAbstraction)
    {
        if(this.herances == null)
            { this.herances = []; }

        this.herances.push(clazz);
    }

    public addSubtype(subtype: InterfaceAbstraction)
    {
        if(this.subTypes == null)
            { this.subTypes = []; }

        this.subTypes.push(subtype);
    }
}

