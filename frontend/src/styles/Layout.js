import styled from "styled-components";

export const MainLayout = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 2rem;
    overflow-x: hidden;

    & > * {
        min-width: 0; /* Allow children to shrink */
    }

    @media (max-width: 900px) {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0.5rem;
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;
    box-sizing: border-box;
    @media (max-width: 900px) {
        padding: 1rem 0.5rem;
    }
`;