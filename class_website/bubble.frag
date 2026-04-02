precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;




float distance_from_sphere(in vec3 p, in vec3 c, float r)
{
    vec2 m = mouse.xy/resolution.xy;
    m.x=1.-m.x;
   m=m*2.-1.;


    float xdim=(resolution.x/resolution.y);
    m.x*=xdim;



    return length(p+ vec3(m,0.) - c) - r ;
}


float map_the_world(in vec3 p)
{
    float displacement = sin(5. * p.x *(sin(time*.1-3.3)+1.5)) * sin(5. * p.y *(cos(time)+1.5)) * sin(5. * p.z *(sin(time*0.9)+1.5)) * 0.05;
    float sphere_0 = distance_from_sphere(p, vec3(0.0), 1.0);

    return sphere_0 + displacement;
}

vec3 calculate_normal(in vec3 p)
{
    const vec3 small_step = vec3(0.001, 0.0, 0.0);

    float gradient_x = map_the_world(p + small_step.xyy) - map_the_world(p - small_step.xyy);
    float gradient_y = map_the_world(p + small_step.yxy) - map_the_world(p - small_step.yxy);
    float gradient_z = map_the_world(p + small_step.yyx) - map_the_world(p - small_step.yyx);

    vec3 normal = vec3(gradient_x, gradient_y, gradient_z);

    return normalize(normal);
}

vec3 ray_march(in vec3 ro, in vec3 rd, in vec2 st)
{
    float total_distance_traveled = 0.0;
    const int NUMBER_OF_STEPS = 32;
    const float MINIMUM_HIT_DISTANCE = 0.001;
    const float MAXIMUM_TRACE_DISTANCE = 1000.0;

    for (int i = 0; i < NUMBER_OF_STEPS; ++i)
    {
        vec3 current_position = ro + total_distance_traveled * rd;

        float distance_to_closest = map_the_world(current_position);

        if (distance_to_closest < MINIMUM_HIT_DISTANCE)
        {
            vec3 normal = calculate_normal(current_position);

            //normal = tex3D(current_position,normal,iChannel0).xyz;
            //normal*=length(texture2D(iChannel0,st).xyz);


            vec3 light_position = vec3(0.0, 0.0, -1.0);
            vec3 direction_to_light = normalize(current_position - light_position);

            float diffuse_intensity = max(0.0, dot(normal, direction_to_light));

            return vec3(1.,1.,1.) * diffuse_intensity;
        }

        if (total_distance_traveled > MAXIMUM_TRACE_DISTANCE)
        {
            break;
        }
        total_distance_traveled += distance_to_closest;
    }
    return vec3(0.0);
}

void main(void)
{


    vec2 uv = (gl_FragCoord.xy/vec2(resolution.xy)) ;
    uv = uv* 2.0 - 1.0;
    float xdim=(resolution.y/resolution.x);
    uv.y*=xdim;


    vec3 camera_position = vec3(0.0, 0.0, -5.0);
    vec3 ro = camera_position;
    vec3 rd = vec3(uv, 1.0);

    vec3 shaded_color = ray_march(ro, rd,uv);

    gl_FragColor = vec4(shaded_color, 1.0);
}
