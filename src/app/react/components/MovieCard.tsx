import { Card, Typography } from "@mui/material";

export interface CardProps {
    id: number;
    image: string;
    title: string;
    date: string;
}
export default function MovieCard(props: CardProps) {
    const { image, title, date } = props;
    return (
        <>
            <div>
                <Card
                    style={{
                        width: "250px",
                        height: "300px",
                        margin: "10px",
                        background: "#092C39",
                    }}>
                    <Card
                        style={{
                            margin: "7px",
                            height: "220px",
                            background: "grey",
                        }}>
                        <img style={{ objectFit: "contain" }} />
                    </Card>
                    <div style={{ paddingLeft: "7px" }}>
                        <Typography style={{ color: "white" }}>
                            Movie Name
                        </Typography>
                        <Typography
                            style={{ color: "white", marginTop: "2px" }}>
                            Movie Date
                        </Typography>
                    </div>
                </Card>
            </div>
        </>
    );
}
