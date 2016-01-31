#define SHADER_NAME test.vert

attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;

varying vec3 vNormal;

void main() {
    gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
    vNormal = 0.5 * aNormal + 0.5;
    vNormal += pow(clamp(dot(vec3(uModel * vec4(aNormal,1)), normalize(vec3(1,1,2))), 0.0, 1.0), 128.0);
}
