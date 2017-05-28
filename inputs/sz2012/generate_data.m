% ---- Generate data as in Stoianov and Zorzi's 2012 paper as described in
% ---- supplementary information:
%--------------------------------------------------------------------------
% Each example was a binary 30-by-30 pixel image containing from 1
% to 32 randomly-placed non-overlapping rectangular objects, separated by at least 1 pixel.
% Objects’ cumulative surface area noisily ranged from 32 to 256 pixels at 8 levels (with a step of
% 32). Individual objects were iteratively generated for each image. Object area was initially
% obtained by dividing the target cumulative area by the number of objects to be generated and
% adding Gaussian noise (σ=0.15). Two Gaussian random variables (both with σ=0.3) were
% independently added to the square root of object area (followed by rounding) to define object
% width and height, respectively. The actual object area was then subtracted from the target
% cumulative area to start a new iterative step. 200 images were generated for each level of
% numerosity (n=32) and cumulative surface area (n=8), for a total of 51,200 images. The images
% were not labeled and learning was only unsupervised.

numerosity_range = 32; 
samples_per_num = 200; 
sizex_y = 30; 
cumulative_steps = 8; 

Dataset = zeros(sizex_y, sizex_y, cumulative_steps*numerosity_range*samples_per_num);  % 52100 slices/images default values

rng(1,'twister'); 
randn(100);
index = 1;
for N = 1:numerosity_range
    for area = 1:cumulative_steps
        % -- pick cumulative surface area --
        
        cumA = 32 + 32*(randi([1, 8])-1); 
        % cumA = 32 + 32*(area-1);
        
        samples_count = 1
        while samples_count <= samples_per_num
            drawn_rect = 0; 
            tries = 0
            run_cumA = cumA;
            while run_cumA > 0 && N > drawn_rect
                % -- compute sides of the square--
                
                rect_area = run_cumA/(N-drawn_rect) + 0.15*randn;
                
                a = sqrt(rect_area); 
                
                height = max(1,round(a + 0.3*randn)); % height cannot be 0
                width = max(1,round(a + 0.3*randn)); % width cannot be 0
            
                posy = randi([1, 30-height+1]);
                posx = randi([1, 30-width+1]); 
                tries = tries + 1; 
                if tries > 300
                    % loop protection 
                    break
                    samples_count = samples_count -1;
                end
                if ~check_overlap(Dataset(:, :, index), height, width, posy, posx)
                    Dataset(posy:posy+height-1, posx:posx+width-1, index) = 1;
                    run_cumA = run_cumA - height*width;
                    drawn_rect = drawn_rect + 1;
                    fprintf('height : %d, width : %d\n', height, width);                    
                end                
            end
            cumA
            drawn_rect
            fprintf('processed %dth image\n', index); 
            %imagesc(D(:, :, index)); pause(0.01);      % uncomment for visualization       
            index = index + 1;
            samples_count = samples_count +1;
        end
    end
end
