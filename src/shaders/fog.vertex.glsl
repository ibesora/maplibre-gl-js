in vec2 a_pos;

out float v_fog_depth;

void main() {
    vec4 pos = u_projection_matrix * vec4(a_pos, 0.0, 1.0);
    v_fog_depth = pos.z / pos.w * 0.5 + 0.5;
    gl_Position = pos;
}
