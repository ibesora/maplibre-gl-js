in vec2 a_pos;

uniform mat4 u_proj_matrix;
uniform mat4 u_inv_proj_matrix;
uniform vec3 u_globe_center;

out vec3 view_direction;
out vec2 globe_center;

void main() {
    // Compute each camera ray
    view_direction = (u_inv_proj_matrix * vec4(a_pos, 0.0, 1.0)).xyz;
    // Compute globe center in NDC
    globe_center = (u_proj_matrix * vec4(u_globe_center, 1.0)).xy;
    gl_Position = vec4(a_pos, 0.0, 1.0);
}
