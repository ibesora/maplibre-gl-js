import { Color } from '@maplibre/maplibre-gl-style-spec';
import type {Context} from '../../gl/context';
import { Sky } from '../../style/sky';
import {type UniformValues, type UniformLocations, Uniform1f, Uniform3f, UniformMatrix4f, UniformColor} from '../uniform_binding';
import {type mat4, type vec3} from 'gl-matrix';

export type fogUniformsType = {
    'u_fog_color': UniformColor;
    'u_fog_ground_blend': Uniform1f;
    'u_fog_ground_blend_opacity': Uniform1f;
    'u_horizon_color': UniformColor;
    'u_horizon_fog_blend': Uniform1f;
};

const fogUniforms = (context: Context, locations: UniformLocations): fogUniformsType => ({
    'u_fog_color': new UniformColor(context, locations.u_fog_color),
    'u_fog_ground_blend': new Uniform1f(context, locations.u_fog_ground_blend),
    'u_fog_ground_blend_opacity': new Uniform1f(context, locations.u_fog_ground_blend_opacity),
    'u_horizon_color': new UniformColor(context, locations.u_horizon_color),
    'u_horizon_fog_blend': new Uniform1f(context, locations.u_horizon_fog_blend),
});

const fogUniformValues = (
    sky: Sky,
    pitch: number,
): UniformValues<fogUniformsType> => ({
    'u_fog_color': sky ? sky.properties.get('fog-color') : Color.white,
    'u_fog_ground_blend': sky ? sky.properties.get('fog-ground-blend') : 1,
    'u_fog_ground_blend_opacity': sky ? sky.calculateFogBlendOpacity(pitch) : 0,
    'u_horizon_color': sky ? sky.properties.get('horizon-color') : Color.white,
    'u_horizon_fog_blend': sky ? sky.properties.get('horizon-fog-blend') : 1,
});

export {fogUniforms, fogUniformValues};
