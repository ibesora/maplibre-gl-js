import { Color } from '@maplibre/maplibre-gl-style-spec';
import type {Context} from '../../gl/context';
import { Sky } from '../../style/sky';
import {type UniformValues, type UniformLocations, Uniform1f, Uniform3f, UniformMatrix4f, Uniform1i, Uniform2f, UniformColor} from '../uniform_binding';
import {type mat4, type vec3} from 'gl-matrix';

export type atmosphereUniformsType = {
    'u_sun_pos': Uniform3f;
    'u_atmosphere_blend': Uniform1f;
    'u_globe_position': Uniform3f;
    'u_globe_radius': Uniform1f;
    'u_inv_proj_matrix': UniformMatrix4f;
    'u_render_atmosphere': Uniform1i;
    'u_render_fog': Uniform1i;
    'u_horizon': Uniform2f;
    'u_horizon_normal': Uniform2f;
    'u_map_center_y': Uniform1f;
    'u_fog_color': UniformColor;
    'u_fog_ground_blend': Uniform1f;
    'u_fog_ground_blend_opacity': Uniform1f;
    'u_horizon_color': UniformColor;
    'u_horizon_fog_blend': Uniform1f;
};

const atmosphereUniforms = (context: Context, locations: UniformLocations): atmosphereUniformsType => ({
    'u_sun_pos': new Uniform3f(context, locations.u_sun_pos),
    'u_atmosphere_blend': new Uniform1f(context, locations.u_atmosphere_blend),
    'u_globe_position': new Uniform3f(context, locations.u_globe_position),
    'u_globe_radius': new Uniform1f(context, locations.u_globe_radius),
    'u_inv_proj_matrix': new UniformMatrix4f(context, locations.u_inv_proj_matrix),
    'u_render_atmosphere': new Uniform1i(context, locations.u_render_atmosphere),
    'u_render_fog': new Uniform1i(context, locations.u_render_fog),
    'u_horizon': new Uniform2f(context, locations.u_horizon),
    'u_horizon_normal': new Uniform2f(context, locations.u_horizon_normal),
    'u_map_center_y': new Uniform1f(context, locations.u_map_center_y),
    'u_fog_color': new UniformColor(context, locations.u_fog_color),
    'u_fog_ground_blend': new Uniform1f(context, locations.u_fog_ground_blend),
    'u_fog_ground_blend_opacity': new Uniform1f(context, locations.u_fog_ground_blend_opacity),
    'u_horizon_color': new UniformColor(context, locations.u_horizon_color),
    'u_horizon_fog_blend': new Uniform1f(context, locations.u_horizon_fog_blend),
});

const atmosphereUniformValues = (
    sunPos: vec3,
    atmosphereBlend: number,
    globePosition: vec3,
    globeRadius: number,
    invProjMatrix: mat4,
    renderAtmosphere: boolean,
    renderFog: boolean,
    horizon: [number, number],
    horizonNormal: [number, number],
    mapCenterY: number,
    sky: Sky,
    pitch: number
): UniformValues<atmosphereUniformsType> => ({
    'u_sun_pos': sunPos,
    'u_atmosphere_blend': atmosphereBlend,
    'u_globe_position': globePosition,
    'u_globe_radius': globeRadius,
    'u_inv_proj_matrix': invProjMatrix,
    'u_render_atmosphere': renderAtmosphere ? 1 : 0,
    'u_render_fog': renderFog ? 1 : 0,
    'u_horizon': horizon,
    'u_horizon_normal': horizonNormal,
    'u_map_center_y': mapCenterY,
    'u_fog_color': sky ? sky.properties.get('fog-color') : Color.white,
    'u_fog_ground_blend': sky ? sky.properties.get('fog-ground-blend') : 1,
    // Set opacity to 0 when in globe mode to disable fog
    'u_fog_ground_blend_opacity': sky ? sky.calculateFogBlendOpacity(pitch) : 0,
    'u_horizon_color': sky ? sky.properties.get('horizon-color') : Color.white,
    'u_horizon_fog_blend': sky ? sky.properties.get('horizon-fog-blend') : 1,
});

export {atmosphereUniforms, atmosphereUniformValues};
