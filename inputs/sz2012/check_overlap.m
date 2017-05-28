function result = check_overlap(image, h, w, posh, posw)
    % CHECK_OVERLAP: check whether the current block overlap with an already drawn one 
    % returns: (bool) 1 if not overlapping, 0 if overlapping or touching (1 pixel)  
    
    [H, W] = size(image);
    minh = max(1, posh-1);
    maxh = min(H, posh+h);
    minw = max(1, posw-1);
    maxw = min(W, posw+w);
    
    block = image(minh:maxh, minw:maxw);
    if sum(block(:)) == 0
        result = false;
    else
        result = true;
    end
    
