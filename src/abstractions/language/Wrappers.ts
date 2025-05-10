import { ModifierOptions, VisibilityOptions } from "../shared/Enums";

export interface VisibilityWrapper
{
    wrapVisibility(visibility: VisibilityOptions): string;
}


export interface ModifierWrapper
{
    wrapModifier(modifier: ModifierOptions): string;
}

