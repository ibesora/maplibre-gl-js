uniform vec4 u_fog_color;
uniform vec4 u_horizon_color;
uniform float u_fog_ground_blend;
uniform float u_fog_ground_blend_opacity;
uniform float u_horizon_fog_blend;
uniform bool u_is_globe_mode;

in float v_fog_depth;

const float gamma = 2.2;

vec4 gammaToLinear(vec4 color) {
    return pow(color, vec4(gamma));
}

vec4 linearToGamma(vec4 color) {
    return pow(color, vec4(1.0 / gamma));
}

void main() {
    // Skip fog blending in globe mode
    if (v_fog_depth > u_fog_ground_blend) {
        float blend_color = smoothstep(0.0, 1.0, max((v_fog_depth - u_horizon_fog_blend) / (1.0 - u_horizon_fog_blend), 0.0));
        vec4 fog_horizon_color_linear = mix(gammaToLinear(u_fog_color), gammaToLinear(u_horizon_color), blend_color);
        float factor_fog = max(v_fog_depth - u_fog_ground_blend, 0.0) / (1.0 - u_fog_ground_blend);
        gl_FragColor = linearToGamma(mix(vec4(0, 0, 0, 0), fog_horizon_color_linear, pow(factor_fog, 2.0) * u_fog_ground_blend_opacity));
    }

    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}